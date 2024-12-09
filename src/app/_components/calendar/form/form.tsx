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
import { cn } from "@/lib/utils";
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
import { add, addHours, format } from "date-fns";
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
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  startTime: z.date({ required_error: "Start time is required." }),
  endTime: z.date({ required_error: "End time is required." }),
  description: z.string().optional(),
});

export const TaskForm = ({
  onAddTask,
  selectedDate,
}: {
  onAddTask: (task: Task) => void;
  selectedDate: Date;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      startTime: selectedDate, // Add this
      endTime: addHours(selectedDate, 1), // Add this
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Here you would handle form submission
    //add duration
    onAddTask({
      id: "test",
      ...values,
    });

    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
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
                  <PopoverContent className="w-auto p-0" align="start">
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

                  <SelectContent>
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
                  <PopoverContent className="w-auto p-0" align="start">
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
                    console.log(field.value);
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

                  <SelectContent>
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

        <Button type="submit">Schedule Appointment</Button>
      </form>
    </Form>
  );
};
