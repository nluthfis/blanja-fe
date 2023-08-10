import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: null,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addAuth: (state, action) => {
      state.auth = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addAuth } = counterSlice.actions;

export default counterSlice.reducer;
