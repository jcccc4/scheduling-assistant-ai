"use client";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Task, Priority } from "@prisma/client"; // Import your Task interface
import { v4 as uuidv4 } from "uuid";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { addHours, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { findAvailableTimeSlot } from "./AutoScheduler";
import { Session } from "next-auth";

// Adjust formSchema to match Task interface and handle id generation
const formSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  startTime: z.date(),
  endTime: z.date(),
  description: z.string().nullable(),
  priority: z.nativeEnum(Priority),
  duration: z
    .number()
    .min(0.5, { message: "Duration must be at least 30 minutes" }),
  isAutoScheduled: z.boolean(),
  recurrence: z
    .object({
      frequency: z.enum(["daily", "weekly", "monthly"]),
      endDate: z.date().optional(),
      daysOfWeek: z.array(z.number().min(0).max(6)).optional(),
    })
    .optional(),
  userId: z.string(),
});

export const EventForm = ({
  handleTask,
  title = "",
  selectedDate,
  id = "",
  endDate = addHours(selectedDate, 1),
  operation = "add",
  setOpenPopoverId,
  session,
}: {
  handleTask: (task: Task, operation?: string) => void;
  title?: string;
  selectedDate: Date;
  id?: string;
  endDate?: Date;
  operation?: "add" | "edit" | "delete";
  setOpenPopoverId: (id: string | null) => void;
  session: Session;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: id || uuidv4(),
      title: title,
      description: "",
      startTime: selectedDate,
      endTime: endDate,
      priority: Priority.LOW,
      duration: Math.floor(
        (endDate.getTime() - selectedDate.getTime()) / (1000 * 60 * 60)
      ),
      isAutoScheduled: false,
      userId: session?.user?.id,
    },
  });
  const isAutoScheduled = form.watch("isAutoScheduled");
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.isAutoScheduled) {
      const { startTime, endTime } = await findAvailableTimeSlot(
        values.startTime,
        values.duration
      );
      values.startTime = startTime;
      values.endTime = endTime;
    }
    handleTask(
      {
        ...values,
      },
      operation
    );
    if (setOpenPopoverId) {
      setOpenPopoverId(null);
    }
  }

  function onDelete() {
    handleTask({ ...form.getValues() }, "delete");
    if (setOpenPopoverId) {
      setOpenPopoverId(null);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3 md:gap-4 relative "
      >
        <FormField
          control={form.control}
          name="id"
          render={() => (
            <FormItem className="hidden">
              <FormLabel>id</FormLabel>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input className="relative w-full" {...field} />
              </FormControl>
              <FormDescription>
                Enter your full name for the appointment.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isAutoScheduled"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Auto Schedule</FormLabel>
                <FormDescription>
                  Toggle between manual dates and duration-based scheduling
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Toggle between date fields and duration */}
        {isAutoScheduled ? (
          // Duration field when auto-schedule is ON
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration (hours)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.5"
                    min="0.5"
                    placeholder="Enter duration in hours"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  Specify how long the event will last (minimum 0.5 hours)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <div className="flex flex-col sm:flex-row gap-4 w-full [&>*]:w-full">
            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date & Time</FormLabel>
                  <div className="flex gap-2 relative z-[9999]">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className="w-full pl-3 text-left font-normal"
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick an start date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className=" w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <Select
                      value={field.value.getHours().toString()}
                      onValueChange={(e) => {
                        const timeNumber = Number(e);
                        const newDate = new Date(field.value);
                        newDate.setHours(timeNumber);
                        field.onChange(newDate);
                      }}
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                          <SelectItem key={hour} value={String(hour)}>
                            {`${hour.toString().padStart(2, "0")}:00`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>End Date & Time</FormLabel>
                  <div className="flex gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className="w-full pl-3 text-left font-normal"
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick an end date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <Select
                      value={field.value.getHours().toString()}
                      onValueChange={(e) => {
                        const timeNumber = Number(e);
                        const newDate = new Date(field.value);
                        newDate.setHours(timeNumber);
                        field.onChange(newDate);
                      }}
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                          <SelectItem key={hour} value={String(hour)}>
                            {`${hour.toString().padStart(2, "0")}:00`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <Select
                onValueChange={(value: Priority) => field.onChange(value)}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={Priority.LOW}>Low</SelectItem>
                  <SelectItem value={Priority.MEDIUM}>Medium</SelectItem>
                  <SelectItem value={Priority.HIGH}>High</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          {operation === "edit" && (
            <Button type="button" variant="destructive" onClick={onDelete}>
              Delete
            </Button>
          )}
          <Button type="submit">
            {operation === "edit" ? "Update" : "Schedule"} Appointment
          </Button>
        </div>
      </form>
    </Form>
  );
};
