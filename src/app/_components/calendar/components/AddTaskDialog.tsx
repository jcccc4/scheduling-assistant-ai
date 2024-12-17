"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Task } from "@/lib/types";
import { Form } from "@/components/ui/form";
import { EventForm } from "../form/EventForm";

export const AddTaskDialog = ({
  handleTask,
}: {
  handleTask: (task: Task, operation?: string) => void;
}) => {
  const taskDate = new Date();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" size="sm">
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="w-fit ">
        <DialogHeader>
          <DialogTitle>Add New Event</DialogTitle>
        </DialogHeader>
        <EventForm handleTask={handleTask} selectedDate={taskDate} />
      </DialogContent>
    </Dialog>
  );
};
