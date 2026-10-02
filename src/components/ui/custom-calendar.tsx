"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomCalendarProps {
  selectedDate: string | null;
  onSelectDate: (dateStr: string) => void;
  className?: string;
}

export function CustomCalendar({ selectedDate, onSelectDate, className }: CustomCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // First day of current month
  const firstDayIndex = new Date(year, month, 1).getDay();
  // Total days in current month
  const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

  // Today's date comparison (midnight)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const days = [];
  // Blank days before start of month
  for (let i = 0; i < firstDayIndex; i++) {
    days.push(null);
  }
  // Days of month
  for (let d = 1; d <= totalDaysInMonth; d++) {
    days.push(d);
  }

  const handleDateClick = (dayNumber: number) => {
    // Format YYYY-MM-DD
    const monthFormatted = String(month + 1).padStart(2, "0");
    const dayFormatted = String(dayNumber).padStart(2, "0");
    const formattedStr = `${year}-${monthFormatted}-${dayFormatted}`;

    const dateObj = new Date(year, month, dayNumber);
    if (dateObj < today) return; // Cannot select past dates

    onSelectDate(formattedStr);
  };

  return (
    <div className={cn("w-full bg-card border border-border rounded-2xl p-4 sm:p-5 shadow-2xl glass-card text-foreground", className)}>
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
        <div className="flex items-center space-x-2">
          <CalendarIcon className="w-5 h-5 text-[#ff5500]" />
          <h3 className="text-lg font-outfit font-bold text-foreground">
            {monthNames[month]} <span className="text-[#ff5500]">{year}</span>
          </h3>
        </div>
        <div className="flex items-center space-x-1">
          <button
            type="button"
            onClick={prevMonth}
            className="p-2 rounded-xl bg-secondary hover:bg-[#ff5500]/20 hover:text-[#ff5500] text-muted-foreground transition-colors cursor-pointer"
            aria-label="Previous Month"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={nextMonth}
            className="p-2 rounded-xl bg-secondary hover:bg-[#ff5500]/20 hover:text-[#ff5500] text-muted-foreground transition-colors cursor-pointer"
            aria-label="Next Month"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {daysOfWeek.map((day, idx) => (
          <div key={idx} className="text-xs font-semibold uppercase text-muted-foreground py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {days.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} className="h-9 sm:h-10" />;
          }

          const monthFormatted = String(month + 1).padStart(2, "0");
          const dayFormatted = String(day).padStart(2, "0");
          const dateStr = `${year}-${monthFormatted}-${dayFormatted}`;
          
          const dateObj = new Date(year, month, day);
          dateObj.setHours(0, 0, 0, 0);

          const isPast = dateObj < today;
          const isToday = dateObj.getTime() === today.getTime();
          const isSelected = selectedDate === dateStr;

          return (
            <button
              key={`day-${day}`}
              type="button"
              disabled={isPast}
              onClick={() => handleDateClick(day)}
              className={cn(
                "h-9 sm:h-10 rounded-xl font-medium text-sm transition-all duration-200 flex flex-col items-center justify-center relative cursor-pointer",
                isPast && "text-muted-foreground/40 opacity-40 cursor-not-allowed bg-transparent",
                !isPast && !isSelected && "text-foreground hover:bg-[#ff5500]/15 hover:text-[#ff5500] bg-secondary/70 dark:bg-white/5 border border-border",
                isToday && !isSelected && "border-2 border-[#ff5500]/80 text-foreground font-bold",
                isSelected && "bg-gradient-to-r from-[#ff5500] to-[#ff7700] text-white font-extrabold shadow-lg shadow-[#ff5500]/30 scale-105"
              )}
            >
              <span>{day}</span>
              {isToday && !isSelected && (
                <span className="w-1 h-1 bg-[#ff5500] rounded-full absolute bottom-1" />
              )}
            </button>
          );
        })}
      </div>
      <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full border-2 border-[#ff5500]/80 inline-block" /> Today
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5500] inline-block" /> Selected Slot
        </span>
      </div>
    </div>
  );
}
