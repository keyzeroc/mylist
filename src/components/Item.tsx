const copyPng = "https://cdn-icons-png.flaticon.com/512/1621/1621635.png";
const trashPng = "https://cdn-icons-png.flaticon.com/512/3405/3405244.png";
import { useState } from "react";
import { ItemInterface } from "../types/custom-types";
import Icon from "./UI/Icon";
import LinkPreview from "./UI/LinkPreview";

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
      {/* <p className="self-center font-medium px-2 py-1">{name}</p> */}
      <div className="flex flex-row gap-2 px-2 items-center justify-center">
        {/* <p>{link}</p> */}
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
            icon={copyPng}
            alt="copy"
            onClick={() => {
              navigator.clipboard.writeText(link);
            }}
          />
        </div>
      </div>
      <ul className="flex flex-row gap-2 flex-wrap-nowrap px-2">
        {tags &&
          tags.map((tag, index) => (
            <li className="bg-color-accent-2 px-1 rounded-sm" key={"tag:" + index}>
              {tag}
            </li>
          ))}
      </ul>
      <Icon icon={trashPng} alt="delete" onClick={onRemoveHandler} />
    </div>
  );
}
