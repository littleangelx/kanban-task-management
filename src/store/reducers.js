import { combineReducers } from "@reduxjs/toolkit";

import boardsReducer from "./boardsSlice";
import themeReducer from "./themeSlice";

const rootReducer = combineReducers({
  boardsReducer,
  themeReducer,
});

export default rootReducer;
