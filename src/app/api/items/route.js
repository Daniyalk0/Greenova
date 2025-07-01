import { NextResponse } from "next/server";
// import items from "@/data"; // adjust if needed
import items from '../../../data';

export function GET() {
  return NextResponse.json(items);
}
