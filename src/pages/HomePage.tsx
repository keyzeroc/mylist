import { useEffect, useState } from "react";
import { Input } from "../components/UI/Input";
import { ItemInterface } from "../types/custom-types";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import ItemList from "../components/item/ItemList";
import TagBar from "../components/tag/TagBar";

export default function HomePage() {
  const list = useSelector((state: RootState) => state.list.list);
  const [filteredList, setFilteredList] = useState<Array<ItemInterface>>([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
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
  }, [searchValue, selectedTag, list]);

  const getAllTags = (): Array<string> => {
    const uniqueTags = new Array<string>();
    list.forEach((item) => {
      item.tags?.forEach((tag) => {
        if (!uniqueTags.includes(tag)) uniqueTags.push(tag);
      });
    });
    return uniqueTags;
  };

  const onTagSelectHandler = (tag: string) => {
    console.log(tag);
    setSelectedTag((prevSelectedTag) => (prevSelectedTag === tag ? "" : tag));
  };

  return (
    <div className="flex flex-row gap-4">
      <TagBar tags={getAllTags()} onTagSelect={onTagSelectHandler} />
      <div className="flex flex-col gap-2 flex-1 min-w-48">
        <Input
          name="search"
          placeholder="type to search items"
          onChangeCallback={setSearchValue}
        />
        <ItemList list={filteredList} />
      </div>
    </div>
  );
}