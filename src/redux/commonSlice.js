import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allPayment: [],
};
export const commonSlice = createSlice({
  name: "commomSlice",
  initialState,
  reducers: {
    getAllPayment: (state, action) => {
      state.allPayment = action.payload;
    },
    addPayment: (state, action) => {
      state.allPayment.unshift(action.payload);
    },
  },
});

export const { getAllPayment, addPayment } = commonSlice.actions;
export default commonSlice.reducer;
