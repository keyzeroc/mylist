import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Input } from "./UI/Input";
import { ItemInterface } from "../types/custom-types";
import { useDispatch } from "react-redux";
import { addItem } from "../store/ListSlice";
import TagsList from "./tag/TagsList";
import { pushNotification } from "../store/NotificationSlice";

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

    const notification = { text: "Item has been added", duration: 3000 };
    dispatch(pushNotification({ notification }));
  };
  const onAddTagHandler = () => {
    //@ts-ignore
    const tag = itemTagRef.current.value;
    if (tag.trim() === "") return;
    if (tags.includes(tag)) return;
    setTags((prevTags) => [...prevTags, tag]);
    //@ts-ignore
    itemTagRef.current.value = "";
  };
  const onRemoveTagHandler = (tag: string) => {
    const foundTag = tags.find((currentTag) => currentTag === tag);
    if (!foundTag) return;
    setTags((prevTags) => prevTags.filter((currentTag) => currentTag !== tag));
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
            onKeyDownCallback={onAddTagHandler}
          />
          <button
            className="bg-color-accent rounded-md p-2 max-w-max self-end"
            onClick={onAddTagHandler}
            type="button"
          >
            Add Tag
          </button>
        </div>
        <div className="mt-1">
          <TagsList
            tags={tags}
            removable={true}
            onRemove={onRemoveTagHandler}
          />
        </div>
      </div>
      <button className="bg-color-accent rounded-md p-2" type="submit">
        Add
      </button>
    </form>
  );
}
