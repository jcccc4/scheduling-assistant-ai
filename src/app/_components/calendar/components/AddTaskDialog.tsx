"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Task } from "@/lib/types";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  duration: number;
  priority: "low" | "medium" | "high";
}

interface EventFormProps {
  newEvent: {
    title: string;
    date: string;
    time: string;
    duration: number;
    priority: "low" | "medium" | "high";
  };
  autoSchedule: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (value: "low" | "medium" | "high") => void;
  onAutoScheduleChange: (checked: boolean) => void;
  handleTask: (task: Task, operation?: string) => void;
}

export function EventForm({
  newEvent,
  autoSchedule,
  onInputChange,
  onSelectChange,
  onAutoScheduleChange,

}: EventFormProps) {


  return (
    <form
   
      className="space-y-4 transition-all duration-300 ease-in-out"
    >
      <div
        className={cn(
          "grid gap-4 transition-all duration-300 ease-in-out",
          autoSchedule
            ? "grid-template-rows: repeat(3, auto)"
            : "grid-template-rows: repeat(4, auto)"
        )}
      >
        {/* First row - Title and Auto Schedule */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Event Title</Label>
            <Input
              id="title"
              name="title"
              value={newEvent.title}
              onChange={onInputChange}
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="auto-schedule"
              checked={autoSchedule}
              onCheckedChange={onAutoScheduleChange}
            />
            <Label htmlFor="auto-schedule">Auto Schedule</Label>
          </div>
        </div>

        {/* Second row - Duration and Priority */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Input
              id="duration"
              name="duration"
              type="number"
              min="5"
              step="5"
              value={newEvent.duration}
              onChange={onInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select onValueChange={onSelectChange} value={newEvent.priority}>
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Date and Time with smooth height animation */}
        <div
          className={cn(
            "grid transition-all duration-300 ease-in-out",
            !autoSchedule ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          )}
        >
          <div className="overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={newEvent.date}
                  onChange={onInputChange}
                  required={!autoSchedule}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  name="time"
                  type="time"
                  value={newEvent.time}
                  onChange={onInputChange}
                  required={!autoSchedule}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit button */}
        <div className="transition-all duration-300 ease-in-out">
          <Button type="submit">Add Event</Button>
        </div>
      </div>
    </form>
  );
}

export const AddTaskDialog = ({
  handleTask,
}: {
  handleTask: (task: Task, operation?: string) => void;
}) => {
  const [autoSchedule, setAutoSchedule] = useState(false);
  const [newEvent, setNewEvent] = useState<Omit<Event, "id">>(() => {
    const now = new Date();
    const nextHour = new Date(now.setHours(now.getHours() + 1, 0, 0, 0));
    return {
      title: "",
      date: now.toISOString().split("T")[0],
      time: nextHour.toTimeString().slice(0, 5),
      duration: 30,
      priority: "medium",
    };
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value: "low" | "medium" | "high") => {
    setNewEvent({ ...newEvent, priority: value });
  };

  // const addEvent = (e: React.FormEvent) => {
  //   e.preventDefault();
    // const eventToAdd = {
    //   id: Date.now(),
    //   ...newEvent,
    //   date: autoSchedule ? "" : newEvent.date,
    //   time: autoSchedule ? "" : newEvent.time,
    // };

    // if (autoSchedule) {
    //   const optimizedEvents = optimizeSchedule([...events, eventToAdd]);
      
    // } else {
      
    // }

    // setNewEvent((prevState: any) => ({
    //   ...prevState,
    //   title: "",
    //   priority: "medium",
    // }));
  // };

  // const optimizeSchedule = (allEvents: Event[]): Event[] => {
  //   const now = new Date();
  //   const scheduledEvents = allEvents.filter(
  //     (event) => event.date && event.time
  //   );
  //   const autoEvents = allEvents.filter((event) => !event.date || !event.time);

  //   scheduledEvents.sort(
  //     (a, b) =>
  //       Number(new Date(`${a.date}T${a.time}`)) -
  //       Number(new Date(`${b.date}T${b.time}`))
  //   );

  //   autoEvents.sort((a, b) => {
  //     const priorityOrder = { high: 3, medium: 2, low: 1 };
  //     return priorityOrder[b.priority] - priorityOrder[a.priority];
  //   });

  //   autoEvents.forEach((event) => {
  //     let scheduledTime = new Date(
  //       Math.max(
  //         now.getTime(),
  //         scheduledEvents[scheduledEvents.length - 1]?.date
  //           ? new Date(
  //               `${scheduledEvents[scheduledEvents.length - 1].date}T${
  //                 scheduledEvents[scheduledEvents.length - 1].time
  //               }`
  //             ).getTime() +
  //               scheduledEvents[scheduledEvents.length - 1].duration * 60000
  //           : now.getTime()
  //       )
  //     );

  //     event.date = scheduledTime.toISOString().split("T")[0];
  //     event.time = scheduledTime.toTimeString().slice(0, 5);
  //     scheduledEvents.push(event);
  //   });

  //   return scheduledEvents;
  // };

  return (
    <Dialog>
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
          newEvent={newEvent}
          autoSchedule={autoSchedule}
          onInputChange={handleInputChange}
          onSelectChange={handleSelectChange}
          onAutoScheduleChange={setAutoSchedule}
          handleTask={handleTask}
        />
      </DialogContent>
    </Dialog>
  );
};
