"use client";


import { useMinimised } from "@/context/sidebarWidth";
import { useSelector } from "react-redux";

const getMonthName = (monthNum) => {
  let monthName = "";
  switch (monthNum) {
    case 0:
      monthName = "January";
      break;
    case 1:
      monthName = "February";
      break;
    case 2:
      monthName = "March";
      break;
    case 3:
      monthName = "April";
      break;
    case 4:
      monthName = "May";
      break;
    case 5:
      monthName = "June";
      break;
    case 6:
      monthName = "July";
      break;
    case 7:
      monthName = "August";
      break;
    case 8:
      monthName = "September";
      break;
    case 9:
      monthName = "October";
      break;
    case 10:
      monthName = "November";
      break;
    case 11:
      monthName = "December";
      break;
  }
  return monthName;
};

const StepsSummary = () => {
  const { isMinimised } = useMinimised();

  let steps = useSelector((state) => state.stepsReducer.steps);

  let stepsSorted = [...steps].sort(
    (objA, objB) => new Date(objA.start) - new Date(objB.start)
  );

  if (stepsSorted.length == 0) {
    return (
      <div
        className={`bg-bgColor dark:bg-darkGrey mt-24 p-6 h-full min-h-screen flex gap-6 ${
          isMinimised ? "" : "ml-[18.75rem]"
        }`}
      >
        <h1>No steps recorded!</h1>
      </div>
    );
  }

  const earliestDate = new Date(stepsSorted[0].start);
  const earliestYear = earliestDate.getFullYear();

  const currentYear = new Date(Date.now()).getFullYear();

  let years = [];
  let stepsObj = [];

  for (let year = earliestYear; year <= currentYear; year++) {
    years.push(year);
    const yearData = steps.filter(
      (item) => new Date(item.start).getFullYear() === year
    );
    for (let month = 0; month <= 11; month++) {
      const stepsList = steps
        .filter(
          (item) =>
            new Date(item.start).getFullYear() === year &&
            new Date(item.start).getMonth() === month
        )
        .sort((objA, objB) => objB.title - objA.title);

      stepsObj.push({ year, month, steps: stepsList });
    }
  }

  const finalSteps = stepsObj.filter((item) => item.steps.length > 0);
  console.log(finalSteps);

  return (
    <div
      className={`bg-bgColor dark:bg-darkGrey mt-24 p-6 h-full min-h-screen flex gap-6 ${
        isMinimised ? "" : "ml-[18.75rem]"
      }`}
    >
      <div className="flex flex-col gap-10">
        {years.map((year) => (
          <div
            key={year}
            className={
              "bg-bgColor dark:bg-darkGrey hover:bg-brandPurple/20 dark:hover:bg-brandPurple/20 p-6 flex flex-col items-center justify-center cursor-pointer gap-6 rounded-xl"
            }
            style={{ boxShadow: "0px 10px 20px 0px rgba(54, 78, 126, 0.25)" }}
          >
            <h1 className="font-bold text-xl">{year}</h1>
            {finalSteps
              .filter((item) => item.year === year)
              .sort((objA, objB) => objA.month - objB.month)
              .map((month) => (
                <div
                  key={month.month}
                  className="flex flex-row gap-10 items-center"
                >
                  <h4 className="italic text-lg">
                    {getMonthName(month.month)}:
                  </h4>
                  <span className="text-[#0f0]">
                    Maximum: {month.steps[0].title}{" "}
                  </span>
                  <span className="text-[#f00]">
                    Minimum: {month.steps[month.steps.length - 1].title}{" "}
                  </span>
                  <span className="text-brandPurple font-semibold">
                    Total:{" "}
                    {month.steps.reduce((acc, cur) => acc + cur.title, 0)}
                  </span>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepsSummary;
