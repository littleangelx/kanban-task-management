"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    updateTheme(state, action) {
      state.theme = action.payload;
    },
  },
});

export const { updateTheme } = themeSlice.actions;
export default themeSlice.reducer;
