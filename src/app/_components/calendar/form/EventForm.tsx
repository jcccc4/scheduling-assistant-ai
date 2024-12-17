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
import { Task } from "@/lib/types"; // Import your Task interface
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
import { CalendarIcon, Clock } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Adjust formSchema to match Task interface and handle id generation
const formSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  startTime: z.date({ required_error: "Start time is required." }),
  endTime: z.date({ required_error: "End time is required." }),
  description: z.string().optional(),
});

export const EventForm = ({
  handleTask,
  title = "",
  selectedDate,
  id = "",
  endDate = addHours(selectedDate, 1),
  operation = "add",
  setOpenPopoverId,
}: {
  handleTask: (task: Task, operation?: string) => void;
  title?: string;
  selectedDate: Date;
  id?: string;
  endDate?: Date;
  operation?: "add" | "edit" | "delete";
  setOpenPopoverId?: (id: string | null) => void;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: id || uuidv4(),
      title: title,
      startTime: selectedDate, // Add this
      endTime: endDate, // Add this
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
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
        className="flex flex-col gap-3 md:gap-4 relative max-w-full"
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
        <div className="flex flex-col sm:flex-row space-y-8 sm:space-y-0 sm:space-x-4">
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className="w-[240px] pl-3 text-left font-normal"
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a start date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 z-50" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => {
                        const compareDate = new Date(date);
                        const today = new Date();
                        today.setHours(0);
                        compareDate.setHours(0);
                        return compareDate < today;
                      }}
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
                  <SelectTrigger>
                    <SelectValue placeholder="Select a start time" />
                    <Clock className="ml-auto h-4 w-4 opacity-50" />
                  </SelectTrigger>

                  <SelectContent className="z-50">
                    {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                      <SelectItem key={hour} value={String(hour)}>
                        {`${hour.toString().padStart(2, "0")}:00`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>End Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={"w-[240px] pl-3 text-left font-normal"}
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
                  <PopoverContent className="w-auto p-0 z-50" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => {
                        const compareDate = new Date(date);
                        const today = new Date();
                        today.setHours(0);
                        compareDate.setHours(0);
                        return compareDate < today;
                      }}
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
                  <SelectTrigger>
                    <SelectValue placeholder="Select a start time" />
                    <Clock className="ml-auto h-4 w-4 opacity-50" />
                  </SelectTrigger>

                  <SelectContent className="z-50">
                    {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                      <SelectItem key={hour} value={String(hour)}>
                        {`${hour.toString().padStart(2, "0")}:00`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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
