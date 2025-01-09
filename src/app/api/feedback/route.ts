import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { content } = await req.json();
    const feedback = await prisma.feedback.create({
      data: {
        content,
      },
    });
    return NextResponse.json(feedback);
  } catch (error) {
    console.error("Error creating feedback:", error);
    return NextResponse.json(
      { error: "Error creating feedback" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const feedbacks = await prisma.feedback.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(feedbacks);
  } catch (error) {
    console.error("Error creating feedback:", error);
    return NextResponse.json(
      { error: "Error fetching feedback" },
      { status: 500 }
    );
  }
}
