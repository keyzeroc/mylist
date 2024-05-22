import { useEffect, useState } from "react";
import { Input } from "../components/UI/Input";
import { ItemInterface } from "../types/custom-types";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import ItemList from "../components/item/ItemList";
import { useListTags } from "../hooks/useListTags";
import TagsList from "../components/tag/TagsList";

export default function HomePage() {
  const list: ItemInterface[] = useSelector(
    (state: RootState) => state.list.list
  );
  const [filteredList, setFilteredList] = useState<Array<ItemInterface>>([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [tagList] = useListTags();

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

  const onTagSelectHandler = (tag: string) => {
    setSelectedTag((prevSelectedTag) => (prevSelectedTag === tag ? "" : tag));
  };

  return (
    <div className="flex flex-row gap-4 sm:gap-6 lg:gap-16 2xl:gap-32">
      <TagsList
        isFlexCol={true}
        tags={tagList}
        clickable={true}
        onTagClick={onTagSelectHandler}
        isTagBackground={false}
      />
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
