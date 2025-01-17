"use client";

<<<<<<< HEAD
import DarkModeToggle from "@/components/DarkModeToggle";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  // if (status !== "authenticated") {
  //   router.push("/");
  // }

  return (
    <div className="flex flex-col w-screen h-full min-h-screen px-16 py-8 bg-whiteColor dark:bg-darkGrey">
      <div className="w-60 self-end flex  items-center gap-5">
        <DarkModeToggle />
      </div>
      <div className="mt-16 grid grid-cols-4 gap-16">
        <Link
          href={"/kanban"}
          className="bg-bgColor dark:bg-darkGrey hover:bg-brandPurple/20 dark:hover:bg-brandPurple/20 h-60 p-6 flex flex-col items-center justify-center cursor-pointer gap-10 rounded-xl"
          style={{ boxShadow: "0px 10px 20px 0px rgba(54, 78, 126, 0.25)" }}
        >
          <h1 className="text-xl dark:text-whiteColor">Task Management</h1>
        </Link>
        <Link
          href={"/steps"}
          className="bg-bgColor dark:bg-darkGrey hover:bg-brandPurple/20 dark:hover:bg-brandPurple/20 h-60 p-6 flex flex-col items-center justify-center cursor-pointer gap-10 rounded-xl"
          style={{ boxShadow: "0px 10px 20px 0px rgba(54, 78, 126, 0.25)" }}
        >
          <h1 className="text-xl dark:text-whiteColor">Steps</h1>
        </Link>
        <Link
          href={"/presents"}
          className="bg-bgColor dark:bg-darkGrey hover:bg-brandPurple/20 dark:hover:bg-brandPurple/20 h-60 p-6 flex flex-col items-center justify-center cursor-pointer gap-10 rounded-xl"
          style={{ boxShadow: "0px 10px 20px 0px rgba(54, 78, 126, 0.25)" }}
        >
          <h1 className="text-xl dark:text-whiteColor">Presents</h1>
        </Link>
      </div>
=======
import DeleteTaskModal from "@/components/DeleteTaskModal";
import EditTaskModal from "@/components/EditTaskModal";
import ViewTaskModal from "@/components/ViewTaskModal";
import { useMinimised } from "@/context/sidebarWidth";
import {
  updateSubtaskCompleted,
  updateTaskCategory,
} from "@/store/boardsSlice";
import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const COLUMN_COLORS = ["#49C4E5", "#8471F2", "#67E2AE"];

export default function Home() {
  const { isMinimised } = useMinimised();

  const selectedBoard = useSelector(
    (state) => state.boardsReducer.selectedBoard
  );
  const board = useSelector((state) => state.boardsReducer.boards)[
    selectedBoard
  ];

  const [selectedTask, setSelectedTask] = useState();
  const [selectedColumn, setSelectedColumn] = useState();

  const [viewTaskVisible, setViewTaskVisible] = useState(false);
  const [showEditTask, setShowEditTask] = useState(false);
  const [showDeleteTask, setShowDeleteTask] = useState(false);

  const dispatch = useDispatch();

  const handleViewTaskVisible = (value) => {
    setViewTaskVisible(value);
  };

  const handleChangeCategory = (newCategory) => {
    dispatch(
      updateTaskCategory({
        boardIndex: selectedBoard,
        columnIndex: selectedColumn,
        taskName: selectedTask.title,
        newCategory,
      })
    );
  };

  const handleDeleteTaskVisibility = (value) => {
    setShowDeleteTask(value);
  };

  const handleEditTaskVisibility = (value) => {
    setShowEditTask(value);
  };

  return (
    <div
      className={`bg-bgColor dark:bg-darkGrey mt-24 p-6 h-full min-h-screen grid gap-6 ${
        isMinimised ? "" : "ml-[18.75rem]"
      }`}
      style={{ gridTemplateColumns: "1fr 1fr 1fr" }}
    >
      {board.columns.map((column, index) => (
        <div key={index} className="flex flex-col gap-6">
          <div className="flex gap-3 items-center">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: COLUMN_COLORS[index] }}
            />
            <h4 className="text-mediumGrey text-xs font-bold tracking-[0.15rem] uppercase">
              {column.name} ({column.tasks.length})
            </h4>
          </div>
          <div className="flex flex-col gap-5">
            {column.tasks.map((task) => (
              <div
                key={task.title}
                className="w-[17.5rem] px-4 py-6 rounded-lg flex flex-col gap-2 bg-whiteColor dark:bg-darkGrey cursor-pointer"
                style={{
                  boxShadow: "0px 4px 6px 0px rgba(54, 78, 126, 0.10)",
                }}
                onClick={() => {
                  setSelectedColumn(index);
                  setSelectedTask(task);
                  handleViewTaskVisible(true);
                }}
              >
                <p className="text-[#000112] dark:text-whiteColor text-[0.9375rem] font-bold">
                  {task.title}
                </p>
                <p className="text-mediumGrey text-xs font-bold">
                  {
                    task.subtasks.filter(
                      (subtask) => subtask.isCompleted === true
                    ).length
                  }{" "}
                  of {task.subtasks.length} subtasks completed
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
      {selectedTask && (
        <>
          <ViewTaskModal
            isVisible={viewTaskVisible}
            onChangeVisibility={handleViewTaskVisible}
            task={selectedTask}
            selectedBoard={selectedBoard}
            selectedColumn={selectedColumn}
            onChangeCategory={handleChangeCategory}
            onChangeDeleteTaskVisibility={handleDeleteTaskVisibility}
            onChangeEditTaskVisibility={handleEditTaskVisibility}
          />
          <DeleteTaskModal
            isVisible={showDeleteTask}
            taskName={selectedTask.title}
            selectedBoard={selectedBoard}
            selectedColumn={selectedColumn}
            onChangeVisibility={handleDeleteTaskVisibility}
          />
          <EditTaskModal
            isVisible={showEditTask}
            task={selectedTask}
            selectedBoard={selectedBoard}
            selectedColumn={selectedColumn}
            onChangeVisibility={handleEditTaskVisibility}
          />
        </>
      )}
>>>>>>> parent of 6bfbf04 (changed to katie's tools)
    </div>
  );
}
