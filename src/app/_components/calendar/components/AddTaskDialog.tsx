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
import { Session } from "next-auth";

export const AddTaskDialog = ({
  handleTask,
  openPopoverId,
  setOpenPopoverId,
  session,
}: {
  handleTask: (task: Task, operation?: string) => void;
  openPopoverId: string | null;
  setOpenPopoverId: (id: string | null) => void;
  session: Session;
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
      <DialogContent className="w-[90vw] md:w-[450px] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Add New Event</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <EventForm
            handleTask={handleTask}
            selectedDate={taskDate}
            setOpenPopoverId={setOpenPopoverId}
            session={session}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
