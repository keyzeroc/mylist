import { createSlice } from "@reduxjs/toolkit";
import { NotificationState } from "../types/custom-types";
import { v4 as uuidv4 } from "uuid";

const initialState: NotificationState = {
  notifications: []
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    pushNotification: (state, action) => {
      const notification = action.payload.notification;
      const newNotification = {
        id: uuidv4(),
        text: notification.text,
        duration: notification.duration
      }
      state.notifications.push(newNotification);
    },
    clearNotification: (state, action) => {
      const foundNoti = state.notifications.find(noti => noti.id === action.payload.id);
      if (foundNoti) state.notifications = state.notifications.filter(noti => noti.id !== action.payload.id);
    }
  }
});

export const { pushNotification, clearNotification } = notificationSlice.actions;

export default notificationSlice.reducer;