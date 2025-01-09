"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Dispatch } from "react";
import { Feedback } from "@prisma/client";

const formSchema = z.object({
  feedback: z.string().min(10, {
    message: "Feedback must be at least 10 characters.",
  }),
});

export function FeedbackForm({
  setFeedbacks,
}: {
  setFeedbacks: Dispatch<React.SetStateAction<Feedback[]>>;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      feedback: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: values.feedback }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit feedback");
      }

      const newFeedback: Feedback = await response.json();

      setFeedbacks((prevFeedbacks: Feedback[]) => [
        newFeedback,
        ...prevFeedbacks,
      ]);

      form.reset();
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  }

  return (
    <div>
      <div className="w-full">
        <div className="sm:max-w-[425px]">
          <div>
            <div>Send Feedback</div>
            <div>Share your thoughts with us. We appreciate your feedback!</div>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="feedback"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Feedback</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us what you think..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Submit Feedback
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
