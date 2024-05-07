import { createSlice } from '@reduxjs/toolkit'
import { ThemeState } from '../types/custom-types';

const initialState: ThemeState = {
  currentTheme: 'dark'
}
export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    switchTheme: (state) => {
      state.currentTheme = state.currentTheme === "dark" ? "light" : 'dark';
    }
  }
})

export const { switchTheme } = themeSlice.actions
export default themeSlice.reducer