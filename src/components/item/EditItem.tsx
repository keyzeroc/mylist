import { useDispatch } from "react-redux";
import { Input } from "../UI/Input";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useRef, useState } from "react";
import { addItem, removeItem, updateItem } from "../../store/ListSlice";
import { ItemInterface, NotificationInterface } from "../../types/custom-types";
import { pushNotification } from "../../store/NotificationSlice";
import { IMAGES } from "../../assets/images";
import Icon from "../UI/Icon";
import TagInput from "../tag/TagInput";

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

    if (type === "new") {
      itemNameRef.current!.value = "";
      itemLinkRef.current!.value = "";
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

  return (
    <form className="flex flex-col gap-2" onSubmit={onFormSubmit}>
      <Input
        autocomplete="off"
        className={`${type === "edit" && "p-2"}`}
        name="name"
        ref={itemNameRef}
        label={`${type === "new" ? "Enter" : "Edit"} name:`}
      />
      <Input
        autocomplete="off"
        className={`${type === "edit" && "p-2"}`}
        name="link"
        ref={itemLinkRef}
        label={`${type === "new" ? "Enter" : "Edit"} link:`}
      />
      <TagInput type={type} oldTags={oldTags} onTagsChange={setTags} />
      <div className="flex flex-row">
        <Icon
          className={`${type === "new" && "bg-color-accent"}`}
          icon={IMAGES.save.image}
          alt={IMAGES.save.alt}
          type="submit"
        />
        {type === "edit" && (
          <Icon
            icon={IMAGES.delete.image}
            alt={IMAGES.delete.alt}
            onClick={onRemoveHandler}
          />
        )}
      </div>
    </form>
  );
}
