import { useEffect, useState } from "react";
import Item from "../components/Item";
import { Input } from "../components/UI/Input";
import { ItemInterface } from "../types/custom-types";
import { useSelector, useDispatch } from "react-redux";
import { removeItem } from "../store/ListSlice";
import { RootState } from "../store/store";

export default function HomePage() {
  const list = useSelector((state: RootState) => state.list.list);
  const dispatch = useDispatch();
  const [filteredList, setFilteredList] = useState<Array<ItemInterface>>([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const searchArray = searchValue.toLowerCase().split(" ");
    setFilteredList(list.filter(item=>{
      const itemFields = item.name+" "+item.link+" "+(item?.tags ? item.tags : [])+"".toLowerCase();
      let isDesiredItem = true;
      for (let i = 0; i < searchArray.length && isDesiredItem; i++) {
        if(!itemFields.includes(searchArray[i])) isDesiredItem = false;
      }
      return isDesiredItem;
    }));
  }, [searchValue, list]);

  return (
    <>
      <Input name="search" onChangeCallback={setSearchValue} />
      <div className="flex flex-col items-center gap-2 mt-4">
        {filteredList.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            link={item.link}
            tags={item.tags}
            onRemove={() => dispatch(removeItem({ id: item.id }))}
          />
        ))}
      </div>
    </>
  );
}
