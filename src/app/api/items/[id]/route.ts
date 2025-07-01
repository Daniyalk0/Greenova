import { NextRequest, NextResponse } from "next/server";
import items from "@/data";

export function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const item = items.find((item) => item.id === parseInt(params.id));
  if (!item) {
    return NextResponse.json({ message: "Item not found" }, { status: 404 });
  }
  return NextResponse.json(item);
}
