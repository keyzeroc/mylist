import { ItemInterface } from "../types/custom-types";

const LIST_NAME = 'mylist';

export const getListFromLocalStorage = () => {
  const retrievedList = localStorage.getItem(LIST_NAME);

  if (retrievedList === null) {
    return createAndSaveExampleItems();
  }

  if (retrievedList?.length === 0) {
    return [];
  }

  if (retrievedList?.length > 0) {
    return JSON.parse(retrievedList)
  }
}

export const saveListToLocalStorage = (list: ItemInterface[]) => {
  localStorage.setItem(LIST_NAME, JSON.stringify(list));
}

const createAndSaveExampleItems = () => {
  const exampleList: ItemInterface[] = [{
    id: 'exampleItem1',
    name: "Example Item",
    link: 'https://example.com/',
    tags: ['these', 'are', 'tags']
  },
  {
    id: 'exampleItem2',
    name: "Example Item 2",
    link: 'https://example.com/',
    tags: ['press edit below', 'to edit/remove item']
  }];
  saveListToLocalStorage(exampleList);
  return exampleList;
}
