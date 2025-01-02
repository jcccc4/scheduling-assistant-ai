import { Task } from "@prisma/client";


export async function getTasks(): Promise<Task[]> {
  const response = await fetch('/api/tasks');
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  const data = await response.json();
  return data.map((task: Task) => ({
    ...task,
    startTime: new Date(task.startTime),
    endTime: new Date(task.endTime)
  }));
}

export async function createTask(task: Task): Promise<Task> {
  const response = await fetch('/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error('Failed to create task');
  }
  const data = await response.json();
  return {
    ...data,
    startTime: new Date(data.startTime),
    endTime: new Date(data.endTime)
  };
}

export async function updateTask(task: Task): Promise<Task> {
  const response = await fetch('/api/tasks', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error('Failed to update task');
  }
  const data = await response.json();
  return {
    ...data,
    startTime: new Date(data.startTime),
    endTime: new Date(data.endTime)
  };
}

export async function deleteTask(id: string): Promise<void> {
  const response = await fetch('/api/tasks', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });
  if (!response.ok) {
    throw new Error('Failed to delete task');
  }
}