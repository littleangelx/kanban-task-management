"use client";

import { addTask, editTask, updateTaskCategory } from "@/store/boardsSlice";
import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AddTaskModal = ({ isVisible, onChangeVisibility, selectedBoard }) => {
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  const categories = useSelector((state) => state.boardsReducer.boards)[
    selectedBoard
  ].columns.map((column) => column.name);

  const [tempNewTitle, setTempNewTitle] = useState();
  const [tempNewDescription, setTempNewDescription] = useState();
  const [tempNewSubtasks, setTempNewSubtasks] = useState([""]);
  const [newSubtasks, setNewSubtasks] = useState([]);
  const [tempNewCategory, setTempNewCategory] = useState(categories[0]);

  const dispatch = useDispatch();

  const handleSaveChanges = () => {
    dispatch(
      addTask({
        boardIndex: selectedBoard,
        title: tempNewTitle,
        description: tempNewDescription,
        subtasks: newSubtasks,
        category: tempNewCategory,
      })
    );

    onChangeVisibility(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-[#00000090] flex justify-center items-center z-20 ">
      <div className="w-[30rem] p-8 bg-whiteColor dark:bg-darkGrey rounded-md flex flex-col gap-4">
        <h4 className="text-[#000112] dark:text-whiteColor text-lg font-bold">
          Add New Task
        </h4>
        <div className="flex flex-col gap-2">
          <label className="text-mediumGrey dark:text-whiteColor text-xs font-bold">
            Title
          </label>
          <input
            className="w-full h-8 rounded border border-[#828FA325] px-4 text-[#000112] text-xs font-medium dark:text-whiteColor dark:bg-darkGrey"
            defaultValue={tempNewTitle}
            onChange={(e) => setTempNewTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-mediumGrey dark:text-whiteColor text-xs font-bold">
            Description
          </label>
          <textarea
            className="w-full h-20 rounded border border-[#828FA325] px-4 text-[#000112] text-xs font-medium py-2 resize-none dark:bg-darkGrey dark:text-whiteColor"
            defaultValue={tempNewDescription}
            onChange={(e) => setTempNewDescription(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-mediumGrey text-xs font-bold dark:text-whiteColor">
            Subtasks
          </label>
          {tempNewSubtasks.map((subtask, index) => (
            <div key={subtask.title} className="flex gap-4 items-center">
              <input
                className="w-full h-8 rounded border border-[#828FA325] px-4 text-[#000112] text-xs font-medium flex-1 dark:bg-darkGrey dark:text-whiteColor"
                defaultValue={subtask.title}
                onBlur={(e) =>
                  setNewSubtasks((prev) => [
                    ...prev,
                    { title: e.target.value, isCompleted: false },
                  ])
                }
              />
              <Image
                src={"/assets/icon-cross.svg"}
                width={12}
                height={12}
                alt="delete subtask icon"
                onClick={() =>
                  setTempNewSubtasks((prev) =>
                    prev.filter((item) => item.title !== subtask.title)
                  )
                }
              />
            </div>
          ))}
        </div>
        <button
          className="w-full h-8 bg-brandPurple/10 text-brandPurple text-xs font-bold rounded-full dark:bg-whiteColor"
          onClick={() =>
            setTempNewSubtasks((prev) => [
              ...prev,
              { title: "", isCompleted: false },
            ])
          }
        >
          + Add New Subtask
        </button>
        <div className="flex flex-col gap-2">
          <label className="text-mediumGrey dark:text-whiteColor text-xs font-bold">
            Status
          </label>
          <div className="relative w-full">
            <div
              className="w-full px-4 py-2 border border-[#828FA325] rounded flex justify-between items-center cursor-pointer"
              onClick={() => setShowStatusMenu((show) => !show)}
            >
              <p className="text-[#000112] dark:text-whiteColor text-xs font-medium">
                {tempNewCategory}
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
                      setTempNewCategory(category);
                      setShowStatusMenu(false);
                    }}
                  >
                    <p className="text-xs text-mediumGrey dark:text-whiteColor font-medium">
                      {category}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 w-full">
          <button
            className="w-full h-8 rounded-full bg-brandPurple/10 text-brandPurple text-xs"
            onClick={() => onChangeVisibility(false)}
          >
            Cancel
          </button>
          <button
            className="w-full h-8 rounded-full bg-brandPurple text-whiteColor text-xs"
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
