import { addBoard } from "@/store/boardsSlice";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";

const AddBoardModal = ({ isVisible, onChangeVisibility }) => {
  const [name, setName] = useState("");
  const [columns, setColumns] = useState([]);
  const [tempColumns, setTempColumns] = useState([]);

  const dispatch = useDispatch();

  const handleAddBoard = () => {
    dispatch(addBoard({ name, columns }));
    onChangeVisibility(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-[#00000090] flex justify-center items-center z-20 ">
      <div className="w-[30rem] p-8 bg-whiteColor dark:bg-darkGrey rounded-md flex flex-col gap-4">
        <h4 className="text-[#000112] dark:text-whiteColor text-lg font-bold">
          Add New Board
        </h4>
        <div className="flex flex-col gap-2">
          <label className="text-mediumGrey dark:text-whiteColor text-xs font-bold">
            Name
          </label>
          <input
            className="w-full h-8 rounded border border-[#828FA325] px-4 text-[#000112] text-xs font-medium dark:text-whiteColor dark:bg-darkGrey"
            placeholder="e.g. Web Design"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-mediumGrey dark:text-whiteColor text-xs font-bold">
            Columns
          </label>
          {tempColumns.map((column) => (
            <div key={column} className="flex gap-4 items-center">
              <input
                className="w-full h-8 rounded border border-[#828FA325] px-4 text-[#000112] text-xs font-medium flex-1 dark:bg-darkGrey dark:text-whiteColor"
                defaultValue={column.name}
                onBlur={(e) =>
                  setColumns((prev) => [
                    ...prev,
                    { name: e.target.value, tasks: [] },
                  ])
                }
              />
              <Image
                src={"/assets/icon-cross.svg"}
                width={12}
                height={12}
                alt="delete column icon"
                onClick={() =>
                  setTempColumns((prev) =>
                    prev.filter((item) => item.name !== column.name)
                  )
                }
                className="cursor-pointer"
              />
            </div>
          ))}
          <button
            className="w-full h-10 rounded-[1.25rem] bg-brandPurple/10 text-brandPurple text-sm font-bold"
            onClick={() =>
              setTempColumns((prev) => [...prev, { name: "", tasks: [] }])
            }
          >
            + Add New Column
          </button>
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
            onClick={handleAddBoard}
          >
            Create New Board
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBoardModal;
