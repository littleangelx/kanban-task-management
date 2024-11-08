"use client";

import { useMinimised } from "@/context/sidebarWidth";
import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddTaskModal from "./AddTaskModal";
import DeleteBoardModal from "./DeleteBoardModal";
import { deleteBoard } from "@/store/boardsSlice";

const Navbar = () => {
  const { isMinimised } = useMinimised();
  const selectedBoard = useSelector(
    (state) => state.boardsReducer.selectedBoard
  );
  const boardName = useSelector(
    (state) => state.boardsReducer.boards[selectedBoard].name
  );

  const dispatch = useDispatch();

  const [showAddTask, setShowAddTask] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleAddTaskVisibility = (value) => {
    setShowAddTask(value);
  };

  const handleMenuVisibility = (value) => {
    setShowMenu(value);
  };

  const [showDeleteBoard, setShowDeleteBoard] = useState(false);

  const handleChangeShowDeleteModal = (value) => {
    setShowDeleteBoard(value);
  };

  const handleDeleteBoard = () => {
    dispatch(deleteBoard({ boardName }));
    handleChangeShowDeleteModal(false);
    handleMenuVisibility(false);
  };

  return (
    <div
      className="xl:h-24 bg-whiteColor dark:bg-darkGrey flex justify-between px-6 items-center fixed"
      style={{
        width: isMinimised ? "calc(100vw - 13rem)" : "calc(100vw - 18.75rem)",
        marginLeft: isMinimised ? "13rem" : "18.75rem",
      }}
    >
      <h2 className="text-[#000112] dark:text-whiteColor text-2xl font-bold">
        {boardName}
      </h2>
      <div className="flex items-center gap-6 relative">
        <button
          className="w-[10.25rem] h-12 rounded-3xl bg-brandPurple text-whiteColor"
          onClick={() => handleAddTaskVisibility(true)}
        >
          + Add New Task
        </button>
        <Image
          src={"/assets/icon-vertical-ellipsis.svg"}
          width={4.5}
          height={20}
          className="cursor-pointer"
          alt="open menu icon"
          onClick={() => setShowMenu((is) => !is)}
        />
        {showMenu && (
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
        )}
      </div>

      <AddTaskModal
        isVisible={showAddTask}
        selectedBoard={selectedBoard}
        onChangeVisibility={handleAddTaskVisibility}
      />
      <DeleteBoardModal
        isVisible={showDeleteBoard}
        onChangeVisibility={handleChangeShowDeleteModal}
        boardName={boardName}
        onChangeMenuVisibility={handleMenuVisibility}
        onDelete={handleDeleteBoard}
      />
    </div>
  );
};

export default Navbar;
