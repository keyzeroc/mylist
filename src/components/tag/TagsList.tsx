import Tag from "./Tag";

type TagsListProps = {
  tags: Array<string> | undefined;
  removable: boolean;
  onRemove?: (tag: string) => void;
};

export default function TagsList({ tags, removable, onRemove }: TagsListProps) {
  return (
    <ul className="flex flex-row gap-2 flex-wrap">
      {tags &&
        tags.map((tag) => (
          <Tag
            key={"tag:" + tag}
            tag={tag}
            removable={removable}
            onRemove={onRemove}
          />
        ))}
    </ul>
  );
}
