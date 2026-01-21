import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppLocation } from "../types/next-auth";

type LocationState = {
  location: AppLocation | null;
  source: "local" | "db" | null; // tracks origin
};

const initialState: LocationState = {
  location: null,
  source: null,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    // Set location with source ("local" or "db")
    setLocation(
      state,
      action: PayloadAction<{ location: AppLocation | null; source: "local" | "db" | null }>
    ) {
      state.location = action.payload.location;
      state.source = action.payload.source;
    },

    // Clear location (used on logout)
    clearLocation(state) {
      state.location = null;
      state.source = null;
    },
  },
});

export const { setLocation, clearLocation } = locationSlice.actions;
export default locationSlice.reducer;
