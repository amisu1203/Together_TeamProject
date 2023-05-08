import { configureStore } from "@reduxjs/toolkit";
import animalList from "../modules/animalListSlice";
import applyForm from "../modules/applyFormSlice";

const store = configureStore({
  reducer: {
    animalList,
    applyForm,
  },
});

export default store;
