import { useState } from "react";
import { ItemInterface, NotificationInterface } from "../../types/custom-types";
import Icon from "../UI/Icon";
import { copyIcon, deleteIcon, editIcon } from "../../assets/images";
import TagsList from "../tag/TagsList";
import EditItem from "./EditItem";
import { useDispatch } from "react-redux";
import { removeItem } from "../../store/ListSlice";
import { pushNotification } from "../../store/NotificationSlice";

interface ItemProps extends ItemInterface {}

export default function Item({ id, link, name, tags }: ItemProps) {
  const dispatch = useDispatch();
  const [isEditMode, setIsEditMode] = useState(false);

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

  const onCopyLink = () => {
    navigator.clipboard.writeText(link);
    const notification: NotificationInterface = {
      text: "Copied to clipboard!",
      duration: 1000,
    };
    dispatch(pushNotification({ notification }));
  };

  return (
    <div className="w-full bg-color-accent flex flex-col rounded-md gap-2">
      {isEditMode && (
        <div className="p-2 pb-0">
          <EditItem id={id} link={link} tags={tags} name={name} type="edit" />
        </div>
      )}
      {!isEditMode && (
        <>
          <div className="flex flex-row gap-2 px-2 items-center justify-center">
            <p className="self-center font-medium px-2 py-1">
              <a href={link} target="_blank">
                {name}
              </a>
            </p>
            <div className="min-w-max max-w-min">
              <Icon icon={copyIcon} alt="copy" onClick={onCopyLink} />
            </div>
          </div>
          <div className="px-2">
            <TagsList tags={tags} clickable={false} />
          </div>
        </>
      )}
      <div className="flex flex-row">
        <Icon
          icon={editIcon}
          alt={isEditMode ? "confirm changes" : "edit"}
          onClick={() => setIsEditMode((prevState) => !prevState)}
        />
        {isEditMode && (
          <Icon icon={deleteIcon} alt="delete" onClick={onRemoveHandler} />
        )}
      </div>
    </div>
  );
}
