// app/api/auth/signup/route.ts

import { registerUser } from "@/src/app/(auth)/signup/actions";
import { NextResponse } from "next/server";
// import { registerUser } from '@/app/actions/auth/registerUser';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await registerUser(body);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("[SIGNUP_ERROR]", error);

    if (error.message === "EMAIL_ALREADY_EXISTS") {
      // Client error → 400
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 400 }
      );
    }

    // Any other error → 500
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
