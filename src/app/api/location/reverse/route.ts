import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    if (!lat || !lon) {
      return NextResponse.json(null);
    }

    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`;

    const res = await fetch(url, {
      headers: {
      "User-Agent": "greenova/0.1 (contact: dev@myapp.com)",
        "Accept": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Reverse geocode failed:", res.status);
      return NextResponse.json(null);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Reverse geocode error:", err);
    return NextResponse.json(null);
  }
}
