import DarkModeToggle from "@/components/DarkModeToggle";
import Logo from "@/components/Logo";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col w-screen h-full min-h-screen px-16 py-8 bg-whiteColor dark:bg-darkGrey">
      <div className="w-36 self-end">
        <DarkModeToggle />
      </div>
      <div className="mt-16 grid grid-cols-4">
        <Link
          href={"/kanban"}
          className="bg-bgColor dark:bg-darkGrey hover:bg-brandPurple/20 dark:hover:bg-brandPurple/20 h-60 p-6 flex flex-col items-center justify-center cursor-pointer gap-10 rounded-xl"
          style={{ boxShadow: "0px 10px 20px 0px rgba(54, 78, 126, 0.25)" }}
        >
          <h1 className="text-xl dark:text-whiteColor">Task Management</h1>
        </Link>
      </div>
    </div>
  );
}
