import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Task } from "@prisma/client";


export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const tasks = await prisma.task.findMany({
      where: {
        userId: String(session.user.id),
      },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch tasks: ${error}` },
      { status: 500 }
    );
  }
}

// POST new task
export async function POST(request: Request) {
  try {
    const task: Task = await request.json();
    const newTask = await prisma.task.create({
      data: {
        id: task.id,
        title: task.title,
        description: task.description,
        startTime: task.startTime,
        endTime: task.endTime,
        priority: task.priority,
        duration: task.duration,
        isAutoScheduled: task.isAutoScheduled,
        userId: task.userId,
      },
    });
    return NextResponse.json(newTask);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch tasks: ${error}` },
      { status: 500 }
    );
  }
}

// PUT update task
export async function PUT(request: Request) {
  try {
    const task: Task = await request.json();
    const updatedTask = await prisma.task.update({
      where: { id: task.id },
      data: {
        title: task.title,
        description: task.description,
        startTime: task.startTime,
        endTime: task.endTime,
      },
    });
    return NextResponse.json(updatedTask);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch tasks: ${error}` },
      { status: 500 }
    );
  }
}

// DELETE task
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await request.json();
    
    // Check if the task belongs to the current user
    const task = await prisma.task.findUnique({
      where: { id },
      select: { userId: true }
    });

    if (!task) {
      return NextResponse.json(
        { error: "Task not found" },
        { status: 404 }
      );
    }

    if (task.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Not authorized to delete this task" },
        { status: 403 }
      );
    }

    await prisma.task.delete({
      where: { id },
    });
    
    return NextResponse.json({ message: "Task deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to delete task: ${error}` },
      { status: 500 }
    );
  }
}
