import { configureStore } from "@reduxjs/toolkit";
import animalList from "../modules/animalListSlice";

const store = configureStore({
  reducer: {
    animalList,
  },
});

export default store;
