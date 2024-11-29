"use client";
import React, { useState } from "react";
import { SidebarTrigger } from "../../../components/ui/sidebar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { formatSimpleTime } from "@/utilities/formatSimpleTime";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
interface Task {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  description?: string;
}

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Calendar() {
  const [view, setView] = useState("weekly"); // Set "month" as default
  const [month, setMonth] = useState(new Date().getMonth()); // Set "month" as default
  const [year, setYear] = useState(new Date().getFullYear()); // Set "month" as default
  const [tasks, setTasks] = useState<Task[]>([]);
  const today = new Date();
  const isToday = (date: Date) => {
    return (
      today.getFullYear() === date.getFullYear() &&
      today.getMonth() === date.getMonth() &&
      today.getDate() === date.getDate()
    );
  };

  const daysInMonth = (month: number, year: number): (string | number)[] => {
    const date = new Date(year, month, 1);
    const days = [];
    for (let i = 0; i < date.getDay(); i++) {
      days.push("");
    }
    while (date.getMonth() === month) {
      days.push(new Date(date).getDate());
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const renderCalendarView = () => {
    switch (view) {
      case "daily":
        return (
          <div className="w-full">
            <div className="bg-white h-10 flex items-center justify-center">
              {today.getDate()}
            </div>
          </div>
        );
      case "weekly":
        return (
          <>
            <div className="grid grid-cols-[80px_1fr] grid-rows-[80px] w-full bg-[hsl(var(--sidebar-border))] gap-[1px] py-[1px] sticky top-0">
              <div className="w-full bg-white flex items-center justify-center">
                GMT
              </div>
              <div className="w-full grid grid-cols-7 gap-[1px] ">
                {Array.from({ length: 7 }).map((_, index) => {
                  const day = new Date(today);
                  day.setDate(today.getDate() - today.getDay() + index);
                  return (
                    <div
                      key={index}
                      className={`bg-white h-full w-full flex p-2 flex-col ${
                        isToday(day) ? "text-blue-700 font-semibold" : ""
                      }`}
                    >
                      <span className="text-3xl ">{day.getDate()}</span>
                      <span className="text-base ">{days[day.getDay()]}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className=" grid grid-cols-[80px_1fr] gap-[1px] min-h-0 grow shrink ">
              <div className="grid auto-rows-[120px] gap-[1px] ">
                {Array.from({ length: 24 }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-white w-full flex items-start justify-center pt-2"
                  >
                    {formatSimpleTime(index)}
                  </div>
                ))}
              </div>
              <div className="w-full grid grid-cols-7 gap-[1px] bg-[hsl(var(--sidebar-border))]  ">
                {Array.from({ length: 7 }).map((_, day) => {
                  return (
                    <div
                      key={day}
                      className=" grid grid-rows-[repeat(24, minmax(0, 1fr)]   gap-[1px]"
                    >
                      {Array.from({ length: 24 }).map((_, hour) => (
                        <Popover key={hour}>
                          <PopoverTrigger asChild className="bg-white">
                            <div className="hover:bg-slate-200 "></div>
                          </PopoverTrigger>
                          <PopoverContent className="w-80 p-4">
                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                const title = formData.get("title") as string;
                                // Get start and end times from the date pickers
                                const startTimeString = formData.get(
                                  "startTime"
                                ) as string;
                                const endTimeString = formData.get(
                                  "endTime"
                                ) as string;
                                const description = formData.get(
                                  "description"
                                ) as string;
                                if (title && startTimeString && endTimeString) {
                                  const newTask = {
                                    id: crypto.randomUUID(),
                                    title,
                                    startTime: new Date(startTimeString),
                                    endTime: new Date(endTimeString),
                                    description,
                                  };
                                  setTasks([...tasks, newTask]);
                                }
                              }}
                            >
                              <div className="grid gap-2">
                                <Label htmlFor="title">Title</Label>
                                <Input type="text" id="title" name="title"  />
                              </div>

                              <div className="grid gap-2 mt-2">
                                <Label htmlFor="startTime">Start Time</Label>
                                <Input
                                  type="datetime-local"
                                  id="startTime"
                                  name="startTime"
                                />
                              </div>
                              <div className="grid gap-2 mt-2">
                                <Label htmlFor="endTime">End Time</Label>
                                <Input
                                  type="datetime-local"
                                  id="endTime"
                                  name="endTime"
                                />
                              </div>
                              <div className="grid gap-2 mt-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea id="description" name="description" />
                              </div>
                              <Button type="submit" className="mt-4">
                                Add Task
                              </Button>
                            </form>
                          </PopoverContent>
                        </Popover>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        );
      case "monthly":
        return (
          <>
            <div>
              <div className="w-full grid grid-cols-7 h-fit gap-[1px]">
                {days.map((day) => (
                  <div
                    key={day}
                    className="bg-white h-10 flex items-center justify-center"
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div className="w-full grid grid-cols-7 gap-[1px]">
                {daysInMonth(today.getMonth(), today.getFullYear()).map(
                  (date, i) => (
                    <div
                      key={i}
                      className="bg-white h-36 flex items-start justify-end p-1"
                    >
                      {isToday(new Date(year, month, Number(date)))}
                    </div>
                  )
                )}
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <>
      <header className="h-14 bg-white flex items-center justify-between text-xl px-4 shrink-0">
        <div className="flex items-center gap-2 ">
          <SidebarTrigger />
          <div>
            <span>{monthNames[today.getMonth()]}</span>{" "}
            <span>{today.getFullYear()}</span>
          </div>
        </div>
        <div className="ml-auto">
          <Select value={view} onValueChange={setView}>
            <SelectTrigger className="w-[100px] h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </header>

      <div className="bg-[hsl(var(--sidebar-border))]  flex flex-col text-xs w-full grow overflow-auto">
        {renderCalendarView()}
      </div>
    </>
  );
}
