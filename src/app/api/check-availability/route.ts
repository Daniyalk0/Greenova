// /app/api/check-availability/route.ts

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { pincode } = await req.json();

  if (!pincode) {
    return NextResponse.json({ status: "unavailable" });
  }

  const area = await prisma.serviceArea.findUnique({
    where: { pincode },
  });

  if (!area) {
    return NextResponse.json({ status: "unavailable" });
  }

  return NextResponse.json({
    status: area.status.toLowerCase(), // "active" | "limited"
  });
}