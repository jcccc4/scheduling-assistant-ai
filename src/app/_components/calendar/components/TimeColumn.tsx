"use client";
import { formatSimpleTime } from "@/utilities/formatSimpleTime";

interface TimeColumnProps {
  gridHeight: number;
}

export const TimeColumn = ({ gridHeight }: TimeColumnProps) => (
  <div className={`grid gap-[1px]`} style={{ gridAutoRows: `${gridHeight}px` }}>
    {Array.from({ length: 24 }).map((_, index) => (
      <div
        key={index}
        className="bg-white w-full flex items-start justify-center pt-1 md:pt-2 text-[10px] md:text-xs"
      >
        {formatSimpleTime(index)}
      </div>
    ))}
  </div>
);