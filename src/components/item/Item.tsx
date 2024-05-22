import { useState } from "react";
import { ItemInterface, NotificationInterface } from "../../types/custom-types";
import Icon from "../UI/Icon";
import { copyIcon, editIcon } from "../../assets/images";
import TagsList from "../tag/TagsList";
import EditItem from "./EditItem";
import { useDispatch } from "react-redux";
import { pushNotification } from "../../store/NotificationSlice";

interface ItemProps extends ItemInterface {}

export default function Item({ id, link, name, tags }: ItemProps) {
  const dispatch = useDispatch();
  const [isEditMode, setIsEditMode] = useState(false);

  const onCopyLink = () => {
    navigator.clipboard.writeText(link);
    const notification: NotificationInterface = {
      text: "Copied to clipboard!",
      duration: 1000,
    };
    dispatch(pushNotification({ notification }));
  };

  const onSwitchEditModeHandler = () => {
    setIsEditMode((prevState) => !prevState);
  };

  return (
    <div className="w-full flex bg-color-accent/10 rounded-md flex-col gap-2 border-b border-color-accent">
      {isEditMode && (
        <EditItem id={id} link={link} tags={tags} name={name} type="edit" />
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
          onClick={onSwitchEditModeHandler}
        />
      </div>
    </div>
  );
}
