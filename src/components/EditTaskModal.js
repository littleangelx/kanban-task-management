"use client";

import { editTask, updateTaskCategory } from "@/store/boardsSlice";
import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const EditTaskModal = ({
  isVisible,
  task,
  onChangeVisibility,
  selectedBoard,
  selectedColumn,
  onChangeCategory,
}) => {
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  const categories = useSelector((state) => state.boardsReducer.boards)[
    selectedBoard
  ].columns.map((column) => column.name);
  const currentCategory = categories[selectedColumn];

  const [tempNewTitle, setTempNewTitle] = useState(task.title);
  const [tempNewDescription, setTempNewDescription] = useState(
    task.description
  );
  const [tempNewSubtasks, setTempNewSubtasks] = useState(task.subtasks);
  const [tempNewCategory, setTempNewCategory] = useState(currentCategory);

  const dispatch = useDispatch();

  const handleSaveChanges = () => {
    dispatch(
      editTask({
        boardIndex: selectedBoard,
        columnIndex: selectedColumn,
        taskName: task.title,
        title: tempNewTitle,
        description: tempNewDescription,
        subtasks: tempNewSubtasks,
      })
    );
    if (tempNewCategory !== currentCategory) {
      dispatch(
        updateTaskCategory({
          boardIndex: selectedBoard,
          columnIndex: selectedColumn,
          taskName: tempNewTitle,
          newCategory: tempNewCategory,
        })
      );
    }

    onChangeVisibility(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-[#00000090] flex justify-center items-center z-20 ">
      <div className="w-[30rem] p-8 bg-whiteColor dark:bg-darkGrey rounded-md flex flex-col gap-4">
        <h4 className="text-[#000112] text-lg font-bold">Edit Task</h4>
        <div className="flex flex-col gap-2">
          <label className="text-mediumGrey text-xs font-bold">Title</label>
          <input
            className="w-full h-8 rounded border border-[#828FA325] px-4 text-[#000112] text-xs font-medium"
            defaultValue={tempNewTitle}
            onChange={(e) => setTempNewTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-mediumGrey text-xs font-bold">
            Description
          </label>
          <textarea
            className="w-full h-20 rounded border border-[#828FA325] px-4 text-[#000112] text-xs font-medium py-2 resize-none"
            defaultValue={tempNewDescription}
            onChange={(e) => setTempNewDescription(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-mediumGrey text-xs font-bold">Subtasks</label>
          {tempNewSubtasks.map((subtask, index) => (
            <div key={subtask.title} className="flex gap-4 items-center">
              <input
                className="w-full h-8 rounded border border-[#828FA325] px-4 text-[#000112] text-xs font-medium flex-1"
                defaultValue={subtask.title}
                onBlur={(e) =>
                  setTempNewSubtasks((prev) =>
                    prev.map((item, itemIndex) => {
                      if (index === itemIndex) {
                        return { ...item, title: e.target.value };
                      }
                      return item;
                    })
                  )
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
          className="w-full h-8 bg-brandPurple/10 text-brandPurple text-xs font-bold rounded-full"
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
          <label className="text-mediumGrey text-xs font-bold">Status</label>
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
                    <p className="text-xs text-mediumGrey font-medium">
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

export default EditTaskModal;
