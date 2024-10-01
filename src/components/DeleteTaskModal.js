"use client";

import { deleteTask } from "@/store/boardsSlice";
import { useDispatch } from "react-redux";

const DeleteTaskModal = ({
  isVisible,
  taskName,
  onChangeVisibility,
  selectedBoard,
  selectedColumn,
}) => {
  const dispatch = useDispatch();

  const handleDeleteTask = () => {
    dispatch(
      deleteTask({
        boardIndex: selectedBoard,
        columnIndex: selectedColumn,
        taskName,
      })
    );
    onChangeVisibility(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-[#00000090] flex justify-center items-center z-20 ">
      <div className="w-[30rem] p-8 bg-whiteColor dark:bg-darkGrey rounded-md flex flex-col gap-6">
        <h4 className="text-[#EA5555] font-bold">Delete this task?</h4>
        <p className="text-sm font-medium text-mediumGrey">
          Are you sure you want to delete the &lsquo;{taskName}&rsquo; task and
          its subtasks? This action cannot be reversed
        </p>
        <div className="grid grid-cols-2 gap-4">
          <button
            className="w-full h-10 rounded-[1.25rem] bg-[#EA5555] text-whiteColor"
            onClick={handleDeleteTask}
          >
            Delete
          </button>
          <button
            className="w-full h-10 rounded-[1.25rem] bg-brandPurple/10 dark:bg-whiteColor text-brandPurple "
            onClick={() => onChangeVisibility(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTaskModal;
