"use client";

import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { boardIcon } from "../../public/assets/board-icon";
import { updateSelectedBoard } from "@/store/boardsSlice";
import DarkModeToggle from "./DarkModeToggle";
import { useTheme } from "@/context/theme";
import { useMinimised } from "@/context/sidebarWidth";
import AddBoardModal from "./AddBoardModal";
import DeleteBoardModal from "./DeleteBoardModal";

const Sidebar = () => {
  const boards = useSelector((state) => state.boardsReducer.boards);
  const selectedBoard = useSelector(
    (state) => state.boardsReducer.selectedBoard
  );
  const dispatch = useDispatch();

  const { theme } = useTheme();
  const { isMinimised, toggleMinimised } = useMinimised();

  const handleChangeSelectedBoard = (index) => {
    dispatch(updateSelectedBoard(+index));
  };

  const [showCreateBoard, setShowCreateBoard] = useState(false);

  const handleChangeShowCreateModal = (value) => {
    setShowCreateBoard(value);
  };

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
            <h4 className="text-mediumGrey text-xs font-bold uppercase tracking-[0.15rem] pl-8">
              All Boards ({boards.length})
            </h4>
            <div className="mt-5 overflow-y-scroll overflow-x-hidden">
              {boards.map((board, index) => (
                <div
                  key={index}
                  className={`w-[19rem] relative -left-8 pl-16 py-4 flex items-center gap-4  cursor-pointer ${
                    selectedBoard === index
                      ? "bg-brandPurple rounded-r-full"
                      : ""
                  }`}
                  onClick={() => handleChangeSelectedBoard(index)}
                >
                  {boardIcon(selectedBoard === index)}
                  <p
                    className={`text-[0.9375rem] font-bold ${
                      selectedBoard === index
                        ? "text-whiteColor"
                        : "text-mediumGrey"
                    }`}
                  >
                    {board.name}
                  </p>
                </div>
              ))}
              <div
                className="flex items-center gap-4 py-4 pl-8 cursor-pointer"
                onClick={() => setShowCreateBoard(true)}
              >
                <Image
                  src={"../assets/icon-board.svg"}
                  width={16}
                  height={16}
                  alt="create new board icon"
                />
                <p className="text-[0.9375rem] font-bold text-brandPurple">
                  + Create New Board
                </p>
              </div>
            </div>
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
      <AddBoardModal
        isVisible={showCreateBoard}
        onChangeVisibility={handleChangeShowCreateModal}
      />
    </>
  );
};

export default Sidebar;
