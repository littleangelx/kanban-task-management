"use client";

import StepsCalendar from "@/components/StepsCalendar";
import { useMinimised } from "@/context/sidebarWidth";

const Steps = () => {
  const { isMinimised } = useMinimised();
  return (
    <div
      className={`bg-bgColor dark:bg-darkGrey mt-24 p-6 h-full min-h-screen flex gap-6 ${
        isMinimised ? "" : "ml-[18.75rem]"
      }`}
    >
      <StepsCalendar />
    </div>
  );
};

export default Steps;
