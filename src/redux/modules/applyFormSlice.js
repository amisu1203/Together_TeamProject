import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const applyFormSlice = createSlice({
  name: "applyForm",
  initialState,
  reducers: {
    addApplyForm: (state, action) => [...state, action.payload],
  },
});

export const { addApplyForm } = applyFormSlice.actions;
export default applyFormSlice.reducer;
