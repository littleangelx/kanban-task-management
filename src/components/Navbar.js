import Image from "next/image";

const Navbar = () => {
  return (
    <div className="w-full xl:h-24 bg-whiteColor flex justify-between px-6 items-center">
      <h2 className="text-[#000112] text-2xl font-bold">Platform Launch</h2>
      <div className="flex items-center gap-6">
        <button className="w-[10.25rem] h-12 rounded-3xl bg-brandPurple text-whiteColor">
          + Add New Task
        </button>
        <Image
          src={"/assets/icon-vertical-ellipsis.svg"}
          width={4.5}
          height={20}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Navbar;
