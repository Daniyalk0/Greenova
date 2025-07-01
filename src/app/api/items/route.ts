import { NextResponse } from "next/server";
import items from "@/data"; // adjust if needed

export function GET() {
  return NextResponse.json(items);
}
