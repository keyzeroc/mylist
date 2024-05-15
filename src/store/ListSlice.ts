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
      const newItem = action.payload.newItem
      state.list.push(newItem);
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
    },
    updateItem: (state, action) => {
      const newItem = action.payload.newItem;
      state.list = state.list.map(item => {
        return item.id === newItem.id ? newItem : item;
      });
    }
  }
})

export const { addItem, removeItem, replaceList, updateItem } = listSlice.actions
export default listSlice.reducer