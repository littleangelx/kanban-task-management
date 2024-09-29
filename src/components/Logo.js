"use client";

import { useMinimised } from "@/context/sidebarWidth";
import { useTheme } from "@/context/theme";
import Image from "next/image";

const Logo = () => {
  const { theme } = useTheme();
  const { isMinimised } = useMinimised();

  return (
    <div
      className={`h-24 pl-8 pt-8 bg-whiteColor dark:bg-darkGrey border-r 
    border-r-[#e4ebfa]  ${isMinimised ? "w-[13rem]" : "w-[18.75rem]"} fixed`}
    >
      <Image
        src={
          theme === "light" ? "/assets/logo-dark.svg" : "/assets/logo-light.svg"
        }
        width={152}
        height={25}
        alt="kanban company logo"
      />
    </div>
  );
};

export default Logo;
