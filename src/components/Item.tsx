import { useState } from "react";
import { ItemInterface } from "../types/custom-types";
import Icon from "./UI/Icon";
import LinkPreview from "./LinkPreview";
import { copyIcon, deleteIcon } from "../assets/images";
import TagsList from "./tag/TagsList";
import Modal from "./UI/Modal";

interface ItemProps extends ItemInterface {
  onRemove: (id: string) => void;
  // onUpdate: (id: string, link: string) => void;
}

export default function Item({ id, link, name, tags, onRemove }: ItemProps) {
  const [isMouseOnCopy, setIsMouseOnCopy] = useState(false);
  const onRemoveHandler = () => {
    onRemove(id as string);
  };

  return (
    <div className="w-full bg-color-accent flex flex-col rounded-md gap-1">
      <div className="flex flex-row gap-2 px-2 items-center justify-center">
        {isMouseOnCopy && <LinkPreview link={link} />}
        <p className="self-center font-medium px-2 py-1">{name}</p>
        <div
          className="min-w-max max-w-min"
          onMouseEnter={() => {
            setIsMouseOnCopy(true);
          }}
          onMouseLeave={() => setIsMouseOnCopy(false)}
        >
          <Icon
            icon={copyIcon}
            alt="copy"
            onClick={() => {
              navigator.clipboard.writeText(link);
            }}
          />
        </div>
      </div>
      <TagsList tags={tags} removable={false} />
      <Icon icon={deleteIcon} alt="delete" onClick={onRemoveHandler} />
    </div>
  );
}
