import { createClient } from "@supabase/supabase-js";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import "dotenv/config";
import fs from "fs";

const prisma = new PrismaClient();
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

const products = JSON.parse(fs.readFileSync("products.json", "utf-8"));

// 🧠 Helper: retry download
async function downloadImageWithRetry(
  url: string,
  retries = 3,
): Promise<Buffer> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios.get(url, { responseType: "arraybuffer" });
      const contentType = response.headers["content-type"];
      if (!contentType?.startsWith("image/")) {
        throw new Error(`Invalid content type: ${contentType}`);
      }
      return Buffer.from(response.data, "binary");
    } catch (err) {
      console.warn(`⚠️ Retry ${i + 1}/${retries} failed for ${url}`);
      if (i === retries - 1) throw err;
      await new Promise((r) => setTimeout(r, 1000)); // wait 1s then retry
    }
  }
  throw new Error("Failed after retries");
}

async function uploadImageToSupabase(imageUrl: string, fileName: string) {
  try {
    const buffer = await downloadImageWithRetry(imageUrl);

    const { error } = await supabase.storage
      .from("products")
      .upload(fileName, buffer, {
        contentType: "image/jpeg",
        upsert: true,
      });

    if (error) throw error;

    const { data: publicUrlData } = supabase.storage
      .from("products")
      .getPublicUrl(fileName);

    return publicUrlData.publicUrl;
  } catch (err: any) {
    console.error(`⚠️ Image upload failed for ${fileName}:`, err.message);
    return imageUrl; // fallback to original external URL
  }
}

async function seed() {
  try {
    await prisma.product.deleteMany({
      where: { slug: { in: products.map((p: { slug: string }) => p.slug) } },
    });
    console.log("🗑️ Existing products deleted");
    for (const product of products) {
      const fileName = `${product.slug}.jpg`;

      const newImageUrl = await uploadImageToSupabase(
        product.imageUrl,
        fileName,
      );

      await prisma.product.create({
        data: {
          name: product.name,
          slug: product.slug,
          category: product.category.toUpperCase(), // Prisma enum: FRUIT / VEGETABLE
          subCategory: product.subCategory ?? null,
          imageUrl: newImageUrl, // Supabase URL

          calories: product.calories ?? null,
          fat: product?.fat ?? null,
          sugar: product?.sugar ?? null,
          carbohydrates: product?.carbohydrates ?? null,
          protein: product?.protein ?? null,

          basePricePerKg: product.basePricePerKg ?? null,
          availableWeights: product.availableWeights ?? [],
          rating: product.rating ?? null,
          discount: product.discount ?? null,
          description: product.description ?? null,
          inStock: product.inStock ?? true,

          isFeatured: false, // default seeded products are not featured
          isActive: true, // default active
        },
      });

      console.log(`✅ Inserted: ${product.name}`);
      await new Promise((r) => setTimeout(r, 300)); // wait 0.3s per insert
    }
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  } finally {
    await prisma.$disconnect(); // close pool
    console.log("🌱 Seeding complete & DB disconnected");
  }
}

seed();
