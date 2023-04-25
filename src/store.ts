import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import notificationReducer from "./features/notification/notificationSlice";
import friendsReducer from "./features/friends/friendsSlice";
import conversationReducer from "./features/conversation/conversationSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    notification: notificationReducer,
    friends: friendsReducer,
    conversation: conversationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
