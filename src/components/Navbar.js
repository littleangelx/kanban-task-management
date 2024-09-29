"use client";

import { useMinimised } from "@/context/sidebarWidth";
import Image from "next/image";

const Navbar = () => {
  const { isMinimised } = useMinimised();
  return (
    <div
      className="xl:h-24 bg-whiteColor dark:bg-darkGrey flex justify-between px-6 items-center fixed"
      style={{
        width: isMinimised ? "calc(100vw - 13rem)" : "calc(100vw - 18.75rem)",
        marginLeft: isMinimised ? "13rem" : "18.75rem",
      }}
    >
      <h2 className="text-[#000112] text-2xl font-bold">Platform Launch</h2>
      <div className="flex items-center gap-6">
        <button className="w-[10.25rem] h-12 rounded-3xl bg-brandPurple text-whiteColor">
          + Add New Task
        </button>
        <Image
          src={"/assets/icon-vertical-ellipsis.svg"}
          width={4.5}
          height={20}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Navbar;
