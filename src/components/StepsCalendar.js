"use client";

// import { Calendar, dateFnsLocalizer } from "react-big-calendar";
// import format from "date-fns/format";
// import parse from "date-fns/parse";
// import startOfWeek from "date-fns/startOfWeek";
// import getDay from "date-fns/getDay";
// import enGB from "date-fns/locale/en-GB";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

const localizer = momentLocalizer(moment);

import "react-big-calendar/lib/css/react-big-calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { addSteps, addTodaySteps } from "@/store/stepsSlice";
import { useState } from "react";

// const locales = {
//   "en-GB": enGB,
// };

// const localizer = dateFnsLocalizer({
//   format,
//   parse,
//   startOfWeek,
//   getDay,
//   locales,
// });

const StepsCalendar = (props) => {
  const stepsList = useSelector((state) => state.stepsReducer.steps);

  const [showDayPopup, setShowDayPopup] = useState(false);
  const [day, setDay] = useState();
  const [steps, setSteps] = useState();

  const dispatch = useDispatch();

  const eventStyleGetter = (event) => {
    let backgroundColor = "";
    if (event.title < 10000) {
      backgroundColor = "red";
    } else if (event.title < 20000) {
      backgroundColor = "orange";
    } else {
      backgroundColor = "green";
    }

    return {
      style: {
        backgroundColor: backgroundColor,
      },
    };
  };

  const openPopup = (slotInfo) => {
    setDay(new Date(slotInfo.start).toISOString());
    setShowDayPopup(true);
  };

  const handleAddDay = () => {
    dispatch(addSteps({ steps, day }));
    console.log(day);
    setShowDayPopup(false);
  };

  return (
    <div className="App relative">
      <Calendar
        popup
        selectable
        localizer={localizer}
        events={stepsList}
        defaultDate={new Date()}
        eventPropGetter={eventStyleGetter}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, width: 700, zIndex: 1 }}
        views={["month"]}
        defaultView="month"
        onSelectSlot={(slotInfo) => openPopup(slotInfo)}
      />
      {showDayPopup && (
        <div className="w-80 h-24 bg-whiteColor dark:bg-darkGrey absolute top-32 left-32 rounded-lg z-10 flex flex-col justify-center items-center">
          <input
            placeholder="Total steps for the day"
            className="border p-4"
            onChange={(e) => setSteps(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-6">
            <button
              className="rounded-lg bg-brandPurple/50 text-whiteColor px-6"
              onClick={() => setShowDayPopup(false)}
            >
              Cancel
            </button>
            <button
              className="rounded-lg bg-brandPurple text-whiteColor px-6"
              onClick={handleAddDay}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepsCalendar;
