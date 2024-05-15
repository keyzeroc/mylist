import Icon from "../UI/Icon";
import { deleteIcon } from "../../assets/images";

interface TagProps {
  tag: string;
  removable: boolean;
  onRemove?: (tag: string) => void;
}

export default function Tag({ tag, onRemove, removable }: TagProps) {
  return (
    <li className="bg-color-accent-2 px-1 rounded-sm flex flex-row items-center gap-1 text-nowrap">
      <p>{tag}</p>
      {removable && (
        <Icon
          icon={deleteIcon}
          alt="x"
          onClick={() => onRemove && onRemove(tag)}
        />
      )}
    </li>
  );
}
