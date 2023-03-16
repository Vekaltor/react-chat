import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import notificationReducer from "./features/notification/notificationSlice";
import friendsReducer from "./features/friends/friendsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    notification: notificationReducer,
    friends: friendsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
