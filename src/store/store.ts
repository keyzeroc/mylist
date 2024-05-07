import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './ThemeSlice'
import listReducer from './ListSlice'
import NotificationReducer from './NotificationSlice';

export const store = configureStore({
  reducer: { theme: themeReducer, list: listReducer, notifications: NotificationReducer }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch