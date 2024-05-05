import { ItemInterface } from "../types/custom-types";

const LIST_NAME = 'mylist';

export const getListFromLocalStorage = () => {
  const retrievedList = localStorage.getItem(LIST_NAME);
  return retrievedList !== null ? JSON.parse(retrievedList) : [];
}

export const saveListToLocalStorage = (list: ItemInterface[]) => {
  localStorage.setItem(LIST_NAME, JSON.stringify(list));
}
