import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Task } from '@/lib/types';

// GET all tasks
export async function GET() {
  try {
    const tasks = await prisma.task.findMany();
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json({ error: `Failed to fetch tasks: ${error}` }, { status: 500 });
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
      },
    });
    return NextResponse.json(newTask);
  } catch (error) {
    return NextResponse.json({ error: `Failed to fetch tasks: ${error}` }, { status: 500 });
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
    return NextResponse.json({ error: `Failed to fetch tasks: ${error}` }, { status: 500 });
  }
}

// DELETE task
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await prisma.task.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Task deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: `Failed to fetch tasks: ${error}` }, { status: 500 });
  }
}