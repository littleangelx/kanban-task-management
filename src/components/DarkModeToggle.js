"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useTheme } from "@/context/theme";

const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="w-full h-12 bg-bgColor dark:bg-darkGrey flex justify-center items-center gap-3 rounded-md">
      <Image
        src={"/assets/icon-light-theme.svg"}
        height={16}
        width={16}
        alt="light mode"
      />
      <div
        className={`w-9 h-[17px] rounded-full cursor-pointer transition-colors duration-300 bg-brandPurple flex items-center`}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <div
          className={`w-[14px] h-[14px] my-auto bg-whiteColor rounded-full transition-transform duration-300 transform ${
            theme === "dark" ? "translate-x-5" : "translate-x-0.5"
          }`}
        ></div>
      </div>
      <Image
        src={"/assets/icon-dark-theme.svg"}
        height={16}
        width={16}
        alt="light mode"
      />
    </div>
  );
};

export default DarkModeToggle;
