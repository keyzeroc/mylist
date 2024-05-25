import { Input } from "../components/UI/Input";
import { ItemInterface } from "../types/custom-types";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import ItemList from "../components/item/ItemList";
import { useTagsList } from "../hooks/useTagsList";
import TagsList from "../components/tag/TagsList";
import { useFilteredList } from "../hooks/useFilteredList";

export default function HomePage() {
  const list: ItemInterface[] = useSelector(
    (state: RootState) => state.list.list
  );
  const [tagList] = useTagsList();
  const { filteredList, setNewSearchValue, setNewSelectedTag } =
    useFilteredList({
      list,
    });

  return (
    <div className="flex flex-row gap-2 sm:gap-8 lg:gap-14 2xl:gap-20">
      <div>
        <TagsList
          isFlexCol={true}
          tags={tagList}
          clickable={true}
          onTagClick={setNewSelectedTag}
          isTagBackground={false}
        />
      </div>
      <div className="flex flex-col gap-2 flex-1 min-w-48">
        <Input
          name="search"
          placeholder="type to search items"
          onChangeCallback={setNewSearchValue}
        />
        <ItemList list={filteredList} />
      </div>
    </div>
  );
}
