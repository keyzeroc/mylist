import { useEffect, useState } from "react";
import { ItemInterface } from "../types/custom-types";

interface useFilteredListProps {
  list: ItemInterface[]
}
export const useFilteredList = ({ list }: useFilteredListProps) => {
  const [filteredList, setFilteredList] = useState<Array<ItemInterface>>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    filterList()
  }, [searchValue, selectedTags, list]);

  const filterList = () => {
    const searchArray = searchValue.toLowerCase().split(" ");
    setFilteredList(
      list.filter((item) => {
        const itemFields =
          item.name +
          " " +
          item.link +
          " " +
          (item?.tags ? item.tags : []) +
          "".toLowerCase();
        let isDesiredItem = true;
        for (let i = 0; i < searchArray.length && isDesiredItem; i++) {
          if (!itemFields.includes(searchArray[i])) {
            isDesiredItem = false;
            break;
          }
        }
        for (const tag of selectedTags) {
          if (!item?.tags.includes(tag)) {
            isDesiredItem = false;
            break;
          }
        }
        return isDesiredItem;
      })
    );
  }

  const setNewSearchValue = (newValue: string) => {
    setSearchValue(newValue);
  }

  const setNewSelectedTag = (newTag: string) => {
    setSelectedTags((prevSelectedTags) => {
      if (prevSelectedTags.includes(newTag)) {
        return prevSelectedTags.filter(tag => tag !== newTag)
      } else {
        return [...prevSelectedTags, newTag];
      }
    })
  }

  return { filteredList, setNewSearchValue, setNewSelectedTag };
}