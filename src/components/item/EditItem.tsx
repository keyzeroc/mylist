import { useDispatch } from "react-redux";
import { Input } from "../UI/Input";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useRef, useState } from "react";
import { addItem, updateItem } from "../../store/ListSlice";
import { ItemInterface, NotificationInterface } from "../../types/custom-types";
import { pushNotification } from "../../store/NotificationSlice";
import TagsList from "../tag/TagsList";
import { saveIcon } from "../../assets/images";
import Icon from "../UI/Icon";

interface EditItemProps extends ItemInterface {
  type: "new" | "edit";
}

export default function EditItem({
  id,
  link,
  name,
  tags: oldTags,
  type,
}: EditItemProps) {
  const dispatch = useDispatch();
  const itemNameRef = useRef<HTMLInputElement | null>(null);
  const itemLinkRef = useRef<HTMLInputElement | null>(null);
  const itemTagRef = useRef<HTMLInputElement | null>(null);
  const [tags, setTags] = useState<Array<string>>(oldTags || []);

  useEffect(() => {
    itemNameRef.current!.value = name;
    itemLinkRef.current!.value = link;
  }, []);

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newName = itemNameRef.current!.value;
    const newLink = itemLinkRef.current!.value;

    const newItem: ItemInterface = {
      id: type === "new" ? uuidv4() : id,
      name: newName,
      link: newLink,
      tags,
    };
    if (type === "new") dispatch(addItem({ newItem }));
    else if (type === "edit") dispatch(updateItem({ newItem }));

    const notification: NotificationInterface = {
      text: `Item has been ${type === "new" ? "added" : "edited"}!`,
      duration: 3000,
    };
    dispatch(pushNotification({ notification }));
  };

  const onAddTagHandler = () => {
    const tag = itemTagRef.current!.value;
    if (tag.trim() === "") return;
    if (tags.includes(tag)) return;
    setTags((prevTags) => [...prevTags, tag]);
    itemTagRef.current!.value = "";
  };

  const onRemoveTagHandler = (tag: string) => {
    const foundTag = tags.find((currentTag) => currentTag === tag);
    if (!foundTag) return;
    setTags((prevTags) => prevTags.filter((currentTag) => currentTag !== tag));
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={onFormSubmit}>
      <Input
        name="name"
        ref={itemNameRef}
        label={`${type === "new" ? "Enter" : "Edit"} name:`}
      />
      <Input
        name="link"
        ref={itemLinkRef}
        label={`${type === "new" ? "Enter" : "Edit"} link:`}
      />
      <div className="flex flex-col">
        <div className="flex flex-row gap-4">
          <Input
            name="tag"
            ref={itemTagRef}
            className="flex-1"
            label={`${
              type === "new" ? "Add" : "Edit"
            } tags: (press Enter to add tag)`}
            onKeyDownCallback={onAddTagHandler}
          />
        </div>
        <div className="mt-1">
          <TagsList
            tags={tags}
            removable={true}
            onRemove={onRemoveTagHandler}
          />
        </div>
      </div>
      <Icon
        className="bg-color-accent"
        icon={saveIcon}
        alt="save"
        type="submit"
      />
    </form>
  );
}
