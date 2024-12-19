"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Task } from "@prisma/client";

import { EventForm } from "../form/EventForm";

export const AddTaskDialog = ({
  handleTask,
  openPopoverId,
  setOpenPopoverId,
}: {
  handleTask: (task: Task, operation?: string) => void;
  openPopoverId: string | null;
  setOpenPopoverId: (id: string | null) => void;
}) => {
  const taskDate = new Date();
  taskDate.setHours(taskDate.getHours(), 0, 0, 0);
  taskDate.setHours(taskDate.getHours() + 1);

  return (
    <Dialog
      open={openPopoverId === `add-task`}
      onOpenChange={(isOpen) => {
        setOpenPopoverId(isOpen ? `add-task` : null);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="default" size="sm">
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Event</DialogTitle>
        </DialogHeader>
        <EventForm
          handleTask={handleTask}
          selectedDate={taskDate}
          setOpenPopoverId={setOpenPopoverId}
        />
      </DialogContent>
    </Dialog>
  );
};
