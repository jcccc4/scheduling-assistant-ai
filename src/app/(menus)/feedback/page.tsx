"use client";
import { FeedbackForm } from "@/components/feedback/feedback-form";
import { FeedbackList } from "./feedback-list";
import { useEffect, useState } from "react";
import { Feedback } from "@prisma/client";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    async function fetchFeedback() {
      try {
        const response = await fetch("/api/feedback");
        if (!response.ok) {
          throw new Error("Failed to fetch feedback");
        }
        const data = await response.json();
        setFeedbacks(data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    }

    fetchFeedback();
  }, []);

  return (
    <div className="bg-white flex flex-col justify-between text-lg md:text-xl px-2 md:px-4 shrink-0 ">
      <div className="flex items-center justify-between gap-2 md:gap-4 h-12">
        <div className="flex">
          <SidebarTrigger />
          <h1 className=" font-semibold ">FeedBack</h1>
        </div>
      </div>
      <div className="max-w-2xl mx-auto">
        <FeedbackForm setFeedbacks={setFeedbacks} />
        <FeedbackList feedbacks={feedbacks} />
      </div>
    </div>
  );
}
