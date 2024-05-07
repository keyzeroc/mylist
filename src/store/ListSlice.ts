import { createSlice } from '@reduxjs/toolkit'
import { ListState } from '../types/custom-types'
import { getListFromLocalStorage, saveListToLocalStorage } from '../lib/storage';

const initialState: ListState = {
  list: getListFromLocalStorage()
}

export const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.list.push(action.payload.newItem);
      saveListToLocalStorage(state.list);
    },
    removeItem: (state, action) => {
      const newList = state.list.filter(item => item.id !== action.payload.id);
      state.list = newList;
      saveListToLocalStorage(newList);
    },
    replaceList: (state, action) => {
      const newList = action.payload.newList;
      state.list = newList;
      saveListToLocalStorage(newList);
    }
  }
})

export const { addItem, removeItem, replaceList } = listSlice.actions
export default listSlice.reducer