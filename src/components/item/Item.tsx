import { useState } from "react";
import { ItemInterface, NotificationInterface } from "../../types/custom-types";
import Icon from "../UI/Icon";
import TagsList from "../tag/TagsList";
import EditItem2 from "./EditItem";
import { useDispatch } from "react-redux";
import { pushNotification } from "../../store/NotificationSlice";
import { IMAGES } from "../../assets/images";

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
    <div className="w-full flex flex-col gap-2 bg-color-accent/10 rounded-md border-b border-color-accent">
      {isEditMode && (
        <EditItem2 id={id} link={link} tags={tags} name={name} type="edit" />
      )}
      {!isEditMode && (
        <>
          <div className="flex flex-row gap-2 px-2 items-center justify-center">
            <p className="self-center text-lg px-2 py-1">
              <a href={link} target="_blank">
                {name}
              </a>
            </p>
            <div className="min-w-max max-w-min">
              <Icon
                icon={IMAGES.copy.image}
                alt={IMAGES.copy.alt}
                onClick={onCopyLink}
              />
            </div>
          </div>
          <div className="px-2">
            <TagsList tags={tags} clickable={false} />
          </div>
        </>
      )}
      <div className="flex flex-row">
        <Icon
          icon={IMAGES.edit.image}
          alt={isEditMode ? "confirm changes" : IMAGES.edit.alt}
          onClick={onSwitchEditModeHandler}
        />
      </div>
    </div>
  );
}
