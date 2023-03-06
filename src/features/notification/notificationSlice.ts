import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NotificationState {
  type: "warning" | "success" | "error" | "information" | null;
  duration?: number;
  message: string;
}

const initialState: NotificationState = {
  type: null,
  duration: 3000, //ms
  message: "",
};

export const notificationSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    createNotification: (
      state,
      { payload }: PayloadAction<NotificationState>
    ) => {
      state.message = payload.message;
      state.type = payload.type;
      if (payload.duration) state.duration = payload.duration;
    },
    clearNotification: (state) => {
      state.type = null;
      state.message = "";
    },
  },
  extraReducers: (builder) => {},
});

export const { createNotification, clearNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
