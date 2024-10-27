import { combineReducers } from "@reduxjs/toolkit";

import boardsReducer from "./boardsSlice";
import themeReducer from "./themeSlice";
import stepsReducer from "./stepsSlice";

const rootReducer = combineReducers({
  boardsReducer,
  themeReducer,
  stepsReducer,
});

export default rootReducer;
