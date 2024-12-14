import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

interface TaskFormFieldsProps {
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
  onSubmit: (e: React.FormEvent) => void;
}

export const TaskFormFields: React.FC<TaskFormFieldsProps> = ({
  newEvent,
  autoSchedule,
  onInputChange,
  onSelectChange,
  onAutoScheduleChange,
  onSubmit,
}) => {
  return (
    <form 
      onSubmit={onSubmit} 
      className="space-y-4 transition-all duration-300 ease-in-out"
    >
      <div className={cn(
        "grid gap-4 transition-all duration-300 ease-in-out",
        autoSchedule 
          ? "grid-template-rows: repeat(3, auto)"
          : "grid-template-rows: repeat(4, auto)"
      )}>
        {/* Title and Auto Schedule */}
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

        {/* Duration and Priority */}
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

        {/* Date and Time with animation */}
        <div className={cn(
          "grid transition-all duration-300 ease-in-out",
          !autoSchedule ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}>
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
};