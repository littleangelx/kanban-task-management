"use client";

import Image from "next/image";
import { useDispatch } from "react-redux";

import { useMinimised } from "@/context/sidebarWidth";
import { useTheme } from "@/context/theme";
import DarkModeToggle from "./DarkModeToggle";

const SidebarSteps = () => {
  const dispatch = useDispatch();

  const { theme } = useTheme();
  const { isMinimised, toggleMinimised } = useMinimised();

  if (isMinimised)
    return (
      <div
        className="w-14 h-12 rounded-r-full bg-brandPurple flex items-center justify-center fixed bottom-8  cursor-pointer"
        onClick={toggleMinimised}
      >
        <Image
          src={"/assets/icon-show-sidebar.svg"}
          width={16}
          height={11}
          alt="icon to show sidebar"
        />
      </div>
    );

  return (
    <>
      <div
        className="w-[18.75rem] fixed top-24 bg-whiteColor dark:bg-darkGrey  pr-6 pt-8 border-r 
    border-r-[#e4ebfa] dark:border-none flex flex-col justify-between"
        style={{ height: "calc(100vh - 6rem)" }}
      >
        <div className="w-full">
          <div className="">
            <h4 className="text-mediumGrey text-xs font-bold uppercase tracking-[0.15rem] pl-8"></h4>
            <div className="mt-5 overflow-y-scroll overflow-x-hidden"></div>
          </div>
        </div>
        <div className="flex flex-col gap-5 pb-12 pl-8">
          <DarkModeToggle />
          <div
            className="flex gap-4 items-center cursor-pointer"
            onClick={toggleMinimised}
          >
            <Image
              src={"/assets/icon-hide-sidebar.svg"}
              width={16}
              height={16}
              alt="hide sidebar"
            />
            <p className="text-mediumGrey text-[0.9375rem] font-bold">
              Hide Sidebar
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarSteps;
