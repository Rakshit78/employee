import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "location",
  initialState: [
  ],
  reducers: {
    addLocations: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addLocations } = locationSlice.actions;
export default locationSlice.reducer;
