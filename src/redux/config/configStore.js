import { configureStore } from "@reduxjs/toolkit";
import animalList from "../modules/animalListSlice";
import applyForm from "../modules/applyFormSlice";
import auth from "../modules/auth";

const store = configureStore({
  reducer: {
    animalList,
    applyForm,
    auth,
  },
});

export default store;
