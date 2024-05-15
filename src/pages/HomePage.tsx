import { useEffect, useState } from "react";
import { Input } from "../components/UI/Input";
import { ItemInterface } from "../types/custom-types";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import ItemList from "../components/item/ItemList";

export default function HomePage() {
  const list = useSelector((state: RootState) => state.list.list);
  const [filteredList, setFilteredList] = useState<Array<ItemInterface>>([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const searchArray = searchValue.toLowerCase().split(" ");
    setFilteredList(
      list.filter((item) => {
        const itemFields = item.name + " " + item.link + " " + (item?.tags ? item.tags : []) + "".toLowerCase();
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
  }, [searchValue, list]);

  return (
    <>
      <Input
        name="search"
        placeholder="type to search items"
        onChangeCallback={setSearchValue}
      />
      <ItemList list={filteredList} />
    </>
  );
}
