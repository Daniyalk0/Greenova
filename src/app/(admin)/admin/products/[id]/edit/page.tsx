
// import { ProductForm } from "../../components/ProductForm";
// import { updateProduct } from "../../actions";
import { prisma } from "@/lib/prisma";
import notFound from "@/src/app/(app)/products/[slug]/not-found";
import ProductForm, { ProductFormValues, SubCategory } from "../../components/ProductForm";
import { updateProduct } from "../../actions";

export default async function EditProductPage({ params }: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
  });

  if (!product) return notFound();

 

const SUB_CATEGORY_VALUES = [
  "freshFruits",
  "exoticFruits",
  "dryFruits",
  "leafyGreens",
  "rootVegetables",
  "herbs",
  "organicVegetables",
] as const;

function isSubCategory(value: string): value is SubCategory {
  return SUB_CATEGORY_VALUES.includes(value as SubCategory);
}


  const defaultValues: ProductFormValues = {
    name: product.name,
    slug: product.slug,
    category: product.category,
    subCategory: product.subCategory && isSubCategory(product.subCategory)
  ? product.subCategory
  : undefined,

    imageUrl: product.imageUrl,
    calories: product.calories ?? undefined,
    fat: product.fat ?? undefined,
    sugar: product.sugar ?? undefined,
    carbohydrates: product.carbohydrates ?? undefined,
    protein: product.protein ?? undefined,
    basePricePerKg: product.basePricePerKg,
    availableWeights: product.availableWeights.map((w) => (w)),
    rating: product.rating ?? undefined,
    discount: product.discount ?? undefined,
    description: product.description ?? undefined,
    inStock: product.inStock,
    isActive: product.isActive,
    isFeatured: product.isFeatured,
    season: product.season,
  };

  return (
    <ProductForm
      defaultValues={defaultValues}
      // onSubmit={(data) => updateProduct(product.id, data)}
      submitLabel="Update Product"
      productId={product.id}
      mode="edit"
    />
  );
}
