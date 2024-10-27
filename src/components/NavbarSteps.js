"use client";

import { useMinimised } from "@/context/sidebarWidth";
import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddTaskModal from "./AddTaskModal";
import DeleteBoardModal from "./DeleteBoardModal";
import { deleteBoard } from "@/store/boardsSlice";

const NavbarSteps = () => {
  const { isMinimised } = useMinimised();

  const dispatch = useDispatch();

  return (
    <div
      className="xl:h-24 bg-whiteColor dark:bg-darkGrey flex justify-between px-6 items-center fixed"
      style={{
        width: isMinimised ? "calc(100vw - 13rem)" : "calc(100vw - 18.75rem)",
        marginLeft: isMinimised ? "13rem" : "18.75rem",
      }}
    >
      <h2 className="text-[#000112] dark:text-whiteColor text-2xl font-bold">
        Steps
      </h2>
      <div className="flex items-center gap-6 relative">
        {/* <Image
          src={"/assets/icon-vertical-ellipsis.svg"}
          width={4.5}
          height={20}
          className="cursor-pointer"
          alt="open menu icon"
          onClick={() => setShowMenu((is) => !is)}
        /> */}
        {/* {showMenu && (
          <div
            className="w-48  p-4 rounded-lg bg-whiteColor dark:bg-[#20212C] flex flex-col gap-4 absolute top-16"
            style={{ boxShadow: "0px 10px 20px 0px rgba(54, 78, 126, 0.25)" }}
          >
            <p
              className="text-[#EA5555] font-medium text-sm cursor-pointer"
              onClick={() => handleChangeShowDeleteModal(true)}
            >
              Delete Board
            </p>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default NavbarSteps;
