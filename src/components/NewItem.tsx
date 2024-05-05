import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Input } from "./UI/Input";
import { ItemInterface } from "../types/custom-types";
import { useDispatch } from "react-redux";
import { addItem } from "../store/ListSlice";

export default function NewItem() {
  const dispatch = useDispatch();
  const itemNameRef = useRef(null);
  const itemLinkRef = useRef(null);
  const itemTagRef = useRef(null);
  const [tags, setTags] = useState<Array<string>>([]);

  useEffect(() => {
    // document.addEventListener('')
  }, []);

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //@ts-ignore
    const name = itemNameRef.current.value;
    //@ts-ignore
    const link = itemLinkRef.current.value;

    if (name.trim() === "" || link.trim() === "") return;
    const newItem: ItemInterface = {
      id: uuidv4(),
      name,
      link,
      tags,
    };
    dispatch(addItem({ newItem }));
    alert("Item has been added!");
  };
  const onAddTag = () => {
    //@ts-ignore
    const tag = itemTagRef.current.value;
    if (tag.trim() === "") return;
    if (tags.includes(tag)) return;
    setTags((prevTags) => [...prevTags, tag]);
    //@ts-ignore
    itemTagRef.current.value = "";
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={onFormSubmit}>
      <Input name="name" ref={itemNameRef} label="Enter name:" />
      <Input name="link" ref={itemLinkRef} label="Enter link:" />
      <div className="flex flex-col">
        <div className="flex flex-row gap-4">
          <Input
            name="tag"
            ref={itemTagRef}
            className="flex-1"
            label="Enter tags:"
          />
          <button
            className="bg-color-accent rounded-md p-2 max-w-max self-end"
            onClick={onAddTag}
            type="button"
          >
            Add Tag
          </button>
        </div>
        <div>
          <ul className="flex flex-row gap-2 flex-wrap mt-1">
            {tags.map((tag, index) => (
              <li
                className="bg-color-accent/70 px-1 rounded-sm"
                key={"tag:" + index}
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button className="bg-color-accent rounded-md p-2" type="submit">
        Add
      </button>
    </form>
  );
}
