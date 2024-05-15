import { ItemInterface } from "../../types/custom-types";
import Item from "./Item";

type ItemListProps = {
  list: Array<ItemInterface>;
};

export default function ItemList({ list }: ItemListProps) {
  return (
    <div className="flex flex-col items-center gap-2 mt-4">
      {list.map((item) => (
        <Item
          key={item.id}
          id={item.id}
          name={item.name}
          link={item.link}
          tags={item.tags}
        />
      ))}
    </div>
  );
}
