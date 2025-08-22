import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authConfig } from "../[...nextauth]/auth.config";

export const POST = async (req: Request) => {
  try {
    // Get logged-in user
    const session = await getServerSession(authConfig);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { oldPassword, newPassword } = await req.json();

    if (!oldPassword || !newPassword) {
      return NextResponse.json(
        { error: "Both fields are required" },
        { status: 400 }
      );
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user || !user.password) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check old password
    const isValid = await bcrypt.compare(oldPassword, user.password);
    if (!isValid) {
      return NextResponse.json(
        { error: "Old password is incorrect" },
        { status: 400 }
      );
    }
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return Response.json(
        { error: "New password cannot be same as old password" },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    if (!user.email) throw new Error("User email is required");

    // Update user
    await prisma.user.update({
      where: { email: user.email },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};
