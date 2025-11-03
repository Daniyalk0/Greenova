import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "../auth/[...nextauth]/auth.config";

export async function GET() {
  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(reviews);
}

export async function POST(req: Request) {
  const session = await getServerSession(authConfig);

  if (!session?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
 
  const { rating, comment } = await req.json();

  if (!rating || !comment)
    return NextResponse.json({ error: "Missing Fields" }, { status: 400 });

  const existing = await prisma.review.findUnique({where: {userId: session.user.id}})
  if(existing) return NextResponse.json({error: 'You Already submitted a review.'},{status: 400})

    const review = await prisma.review.create({
        data:{
            userId: session.user.id,
            userName: session.user.name || 'Anonymous',
            userImage: session.user.image || null,
            rating,
            comment,
        }
    })
    return NextResponse.json(review)
}
