import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q");

    if (!q || q.length < 2) {
      return NextResponse.json([]);
    }

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      q
    )}&countrycodes=in&addressdetails=1&limit=10`;

    const res = await fetch(url, {
      headers: {
        "User-Agent": "greenova/0.1 (contact: dev@myapp.com)",
        "Accept": "application/json",
      },
    });

    if (!res.ok) {
      console.error("Nominatim error:", res.status);
      return NextResponse.json([], { status: 200 });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Location search error:", error);
    return NextResponse.json([], { status: 200 });
  }
}
