"use client";

import { useMinimised } from "@/context/sidebarWidth";
import Image from "next/image";

export default function Home() {
  const { isMinimised } = useMinimised();

  return (
    <div
      className={`bg-bgColor mt-24 p-6 h-full min-h-screen ${
        isMinimised ? "" : "ml-[18.75rem]"
      }`}
    >
      <p>Hi</p>
    </div>
  );
}
