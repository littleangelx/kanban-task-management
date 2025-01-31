"use client";

import { useMinimised } from "@/context/sidebarWidth";
import Image from "next/image";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { isMinimised } = useMinimised();
  const selectedBoard = useSelector(
    (state) => state.boardsReducer.selectedBoard
  );
  const boardName = useSelector((state) => state.boardsReducer.boards)[
    selectedBoard
  ].name;

  return (
    <div
      className="h-24 bg-whiteColor dark:bg-darkGrey flex justify-between px-6 items-center fixed"
      style={{
        width: isMinimised ? "calc(100vw - 13rem)" : "calc(100vw - 18.75rem)",
        marginLeft: isMinimised ? "13rem" : "18.75rem",
      }}
    >
      <h2 className="text-[#000112] dark:text-whiteColor text-2xl font-bold">
        {boardName}
      </h2>
      <div className="flex items-center gap-6">
        <button className="w-[10.25rem] h-12 rounded-3xl bg-brandPurple text-whiteColor">
          + Add New Task
        </button>
        <Image
          src={"/assets/icon-vertical-ellipsis.svg"}
          width={4.5}
          height={20}
          className="cursor-pointer"
          alt="open menu"
        />
      </div>
    </div>
  );
};

export default Navbar;
