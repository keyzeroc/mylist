import { useState } from "react";
import Icon from "../UI/Icon";

interface TagProps {
  tag: string;
  clickable: boolean;
  clickableIcon?: string;
  onTagClick?: (tag: string) => void;
  isTagBackground?: boolean;
}

export default function Tag({
  tag,
  onTagClick,
  clickable,
  clickableIcon,
  isTagBackground = true,
}: TagProps) {
  const [isSelected, setIsSelected] = useState(false);

  const onClickHandler = () => {
    if (!onTagClick) return;
    setIsSelected((prevIsSelected) => !prevIsSelected);
    onTagClick(tag);
  };

  return (
    <li
      className={`px-1 rounded-sm flex flex-row items-center gap-1 text-nowrap ${
        !isTagBackground && !isSelected && "hover:bg-color-accent/20"
      } ${isSelected && "bg-color-accent/40"} ${
        isTagBackground && "bg-color-accent/40"
      }`}
    >
      {!clickable && !clickableIcon && <p>{tag}</p>}
      {clickable && !clickableIcon && (
        <p className="cursor-pointer" onClick={onClickHandler}>
          {tag}
        </p>
      )}
      {clickable && clickableIcon && (
        <>
          <p>{tag}</p>
          <Icon
            icon={clickableIcon as string}
            alt="x"
            onClick={() => onTagClick && onTagClick(tag)}
          />
        </>
      )}
    </li>
  );
}
