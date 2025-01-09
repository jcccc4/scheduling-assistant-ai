"use client";

import { Feedback } from "@prisma/client";

export function FeedbackList({ feedbacks }: { feedbacks: Feedback[] }) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Recent Feedback</h2>
      <div className="space-y-4">
        {feedbacks.map((feedback) => (
          <div key={feedback.id} className="bg-card p-4 rounded-lg shadow">
            <p className="text-card-foreground">{feedback.content}</p>
            <div className="text-sm text-muted-foreground mt-2">
              {new Date(feedback.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
