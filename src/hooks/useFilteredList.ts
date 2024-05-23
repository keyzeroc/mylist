import { useEffect, useState } from "react";
import { ItemInterface } from "../types/custom-types";

interface useFilteredListProps {
  list: ItemInterface[]
}
export const useFilteredList = ({ list }: useFilteredListProps) => {
  const [filteredList, setFilteredList] = useState<Array<ItemInterface>>([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    filterList()
  }, [searchValue, selectedTag, list]);

  const filterList = () => {
    const searchArray = searchValue.toLowerCase().split(" ");
    searchArray.push(selectedTag.toLocaleLowerCase().trim());
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
        return isDesiredItem;
      })
    );
  }

  const setNewSearchValue = (newValue: string) => {
    setSearchValue(newValue);
  }

  const setNewSelectedTag = (newTag: string) => {
    setSelectedTag((prevSelectedTag) => (prevSelectedTag === newTag ? "" : newTag));
  }

  return { filteredList, setNewSearchValue, setNewSelectedTag };
}