"use client";

import { useState, useEffect } from "react";
import { updateSubtaskCompleted } from "@/store/boardsSlice";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

const ViewTaskModal = ({
  isVisible,
  onChangeVisibility,
  task,
  selectedBoard,
  selectedColumn,
  onChangeCategory,
  onChangeDeleteTaskVisibility,
  onChangeEditTaskVisibility,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  const dispatch = useDispatch();

  const [subtasks, setSubtasks] = useState(task.subtasks);

  const categories = useSelector((state) => state.boardsReducer.boards)[
    selectedBoard
  ].columns.map((column) => column.name);
  const currentCategory = categories[selectedColumn];

  useEffect(() => {
    setSubtasks(task.subtasks);
  }, [task]);

  const handleChangeCompleted = (subtaskName) => {
    const updatedSubtasks = subtasks.map((subtask) =>
      subtask.title === subtaskName
        ? { ...subtask, isCompleted: !subtask.isCompleted }
        : subtask
    );
    setSubtasks(updatedSubtasks);

    dispatch(
      updateSubtaskCompleted({
        boardIndex: selectedBoard,
        columnIndex: selectedColumn,
        taskName: task.title,
        subtaskName,
      })
    );

    onChangeVisibility(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-[#00000090] flex justify-center items-center z-20 ">
      <div className="w-[30rem] p-8 bg-whiteColor dark:bg-darkGrey rounded-md flex flex-col ">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-[#000112] dark:text-whiteColor font-bold">
            {task.title}
          </h3>
          <div className="relative -right-3">
            <div
              onClick={() => setShowMenu((show) => !show)}
              className="cursor-pointer w-6 h-6 flex justify-center"
            >
              <Image
                src={"/assets/icon-vertical-ellipsis.svg"}
                width={5}
                height={20}
                alt="open task menu"
              />
            </div>

            {showMenu && (
              <div
                className="w-60 p-4 bg-whiteColor dark:bg-darkGrey flex flex-col gap-4 rounded-lg absolute -left-20 top-10"
                style={{
                  boxShadow: "0px 10px 20px 0px rgba(54, 78, 126, 0.25)",
                }}
              >
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    onChangeVisibility(false);
                    setShowMenu(false);
                    onChangeEditTaskVisibility(true);
                  }}
                >
                  <p className="text-mediumGrey text-sm font-medium">
                    Edit Task
                  </p>
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    onChangeVisibility(false);
                    setShowMenu(false);
                    onChangeDeleteTaskVisibility(true);
                  }}
                >
                  <p className="text-[#EA5555] text-sm font-medium">
                    Delete Task
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        {task.description && (
          <p className="text-mediumGrey text-sm font-medium leading-6 mb-6">
            {task.description}
          </p>
        )}
        <p className="text-mediumGrey text-xs font-bold mb-4">
          Subtasks (
          {subtasks.filter((subtask) => subtask.isCompleted === true).length} of{" "}
          {subtasks.length} completed){" "}
        </p>
        <div className="flex flex-col gap-2 mb-6">
          {subtasks.map((subtask) => (
            <div
              key={subtask.title}
              className="w-full p-4 flex gap-4 bg-bgColor dark:bg-darkGrey dark:hover:bg-brandPurple hover:bg-brandPurple/35 cursor-pointer rounded group"
            >
              <input
                type="checkbox"
                checked={subtask.isCompleted}
                onChange={() => handleChangeCompleted(subtask.title)}
              />
              <p
                className={`text-[#00011250] dark:text-whiteColor/50 group-hover:text-[#000112] dark:group-hover:text-whiteColor text-xs font-bold ${
                  subtask.isCompleted ? "line-through" : ""
                }`}
              >
                {subtask.title}
              </p>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2 mb-6">
          <p className="text-mediumGrey text-xs font-bold">Current Status</p>
          <div className="relative w-full">
            <div
              className="w-full px-4 py-2 border border-brandPurple rounded flex justify-between items-center cursor-pointer"
              onClick={() => setShowStatusMenu((show) => !show)}
            >
              <p className="text-[#000112] dark:text-whiteColor text-sm font-medium">
                {currentCategory}
              </p>
              <Image
                src={"/assets/icon-chevron-down.svg"}
                width={10}
                height={5}
                alt="caret down icon"
              />
            </div>
            {showStatusMenu && (
              <div
                className="w-full rounded-lg p-4 flex flex-col gap-2 absolute bg-whiteColor dark:bg-darkGrey"
                style={{
                  boxShadow: "0px 10px 20px 0px rgba(54, 78, 126, 0.25)",
                }}
              >
                {categories.map((category) => (
                  <div
                    key={category}
                    className="w-full cursor-pointer"
                    onClick={() => {
                      if (category !== currentCategory) {
                        onChangeCategory(category);
                        onChangeVisibility(false);
                      }

                      setShowStatusMenu(false);
                    }}
                  >
                    <p className="text-sm text-mediumGrey font-medium">
                      {category}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <button
          className="w-full rounded-lg bg-brandPurple text-whiteColor text-lg font-bold py-2"
          onClick={() => {
            onChangeVisibility(false);
            setShowMenu(false);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ViewTaskModal;
