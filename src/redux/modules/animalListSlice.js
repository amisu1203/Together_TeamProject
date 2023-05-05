import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const animalListSlice = createSlice({
  name: "animalList",
  initialState,
  reducers: {
    setAnimalList: (state, action) => action.payload,
  },
});

export const { setAnimalList } = animalListSlice.actions;
export default animalListSlice.reducer;
