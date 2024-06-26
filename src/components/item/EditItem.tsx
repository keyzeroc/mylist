import { useDispatch } from "react-redux";
import { Input } from "../UI/Input";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useRef, useState } from "react";
import { addItem, removeItem, updateItem } from "../../store/ListSlice";
import { ItemInterface, NotificationInterface } from "../../types/custom-types";
import { pushNotification } from "../../store/NotificationSlice";
import TagsList from "../tag/TagsList";
import { saveIcon, deleteIcon } from "../../assets/images";
import Icon from "../UI/Icon";
import { useTagsList } from "../../hooks/useTagsList";

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

  const [tagList] = useTagsList();
  
  const [tags, setTags] = useState<Array<string>>(oldTags || []);
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);

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

    // clear input fields and tags so that it's easier to start adding a new item
    if (type === "new") {
      itemNameRef.current!.value = "";
      itemLinkRef.current!.value = "";
      itemTagRef.current!.value = "";
      setTags([]);
      setSuggestedTags([]);
    }
  };

  const onRemoveHandler = () => {
    const userConfirm = confirm(
      "Are you sure you want to remove item? There is no going back."
    );
    if (!userConfirm) return;

    dispatch(removeItem({ id }));

    const notification: NotificationInterface = {
      text: `Item has been removed!`,
      duration: 2000,
    };
    dispatch(pushNotification({ notification }));
  };

  const onAddTagHandler = () => {
    const tag = itemTagRef.current!.value;
    if (tag.trim() === "") return;
    if (tags.includes(tag)) return;
    setTags((prevTags) => [...prevTags, tag]);
    itemTagRef.current!.value = "";
    setSuggestedTags([]);
    itemTagRef.current!.focus();
  };

  const onRemoveTagHandler = (tag: string) => {
    const foundTag = tags.find((currentTag) => currentTag === tag);
    if (!foundTag) return;
    setTags((prevTags) => prevTags.filter((currentTag) => currentTag !== tag));
  };

  const suggestTags = (userTagValue: string) => {
    itemTagRef.current!.value = userTagValue;
    if (userTagValue.trim() === "") {
      setSuggestedTags([]);
      return;
    }
    const suggestedTags = tagList.filter((tag) => tag.includes(userTagValue));
    if (suggestTags.length > 0) setSuggestedTags(suggestedTags);
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={onFormSubmit}>
      <Input
        className={`${type === "edit" && "p-2"}`}
        name="name"
        ref={itemNameRef}
        label={`${type === "new" ? "Enter" : "Edit"} name:`}
      />
      <Input
        className={`${type === "edit" && "p-2"}`}
        name="link"
        ref={itemLinkRef}
        label={`${type === "new" ? "Enter" : "Edit"} link:`}
      />
      <div className="flex flex-col">
        <div className="flex flex-col relative">
          <Input
            autocomplete="off"
            name="tag"
            ref={itemTagRef}
            onChangeCallback={suggestTags}
            className={`flex-1 ${type === "edit" && "p-2"}`}
            label={`${
              type === "new" ? "Add" : "Edit"
            } tags: (press Enter to add tag)`}
            onKeyDownCallback={onAddTagHandler}
          />
          {suggestedTags.length > 0 && (
            <div className="absolute top-full left-0 right-0 bottom-0 z-10 border bg-color-gradient-1 border-color-accent rounded-md w-full min-h-fit max-h-48 overflow-auto">
              <ul>
                {suggestedTags.map((tag) => (
                  <li
                    key={"st:" + tag}
                    className="hover:bg-color-accent"
                    onClick={() => {
                      itemTagRef.current!.value = tag;
                      onAddTagHandler();
                    }}
                  >
                    <button type="button">{tag}</button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className={`mt-1 ${type === "edit" && "p-2"}`}>
          <TagsList
            tags={tags}
            clickable={true}
            clickableIcon={deleteIcon}
            onTagClick={onRemoveTagHandler}
          />
        </div>
      </div>
      <div className="flex flex-row">
        <Icon
          className={`${type === "new" && "bg-color-accent"}`}
          icon={saveIcon}
          alt="save"
          type="submit"
        />
        {type === "edit" && (
          <Icon icon={deleteIcon} alt="delete" onClick={onRemoveHandler} />
        )}
      </div>
    </form>
  );
}
