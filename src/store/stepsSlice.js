"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  steps: [],
};

const stepsSlice = createSlice({
  name: "steps",
  initialState,
  reducers: {
    addSteps(state, action) {
      state.steps = [
        ...state.steps,
        {
          title: +action.payload.steps,
          start: action.payload.day,
          end: action.payload.day,
        },
      ];
    },
  },
});

export const { addSteps } = stepsSlice.actions;
export default stepsSlice.reducer;
