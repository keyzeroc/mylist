import Tag from "./Tag";

type TagsListProps = {
  tags: Array<string> | undefined;
  clickable: boolean;
  clickableIcon?: string;
  onTagClick?: (tag: string) => void;
  isFlexCol?: boolean;
};

export default function TagsList({
  tags,
  clickable,
  onTagClick,
  clickableIcon,
  isFlexCol,
}: TagsListProps) {
  return (
    <ul
      className={`flex ${isFlexCol ? "flex-col" : "flex-row"} gap-2 flex-wrap`}
    >
      {tags &&
        tags.map((tag) => (
          <Tag
            key={"tag:" + tag}
            tag={tag}
            clickable={clickable}
            onTagClick={onTagClick}
            clickableIcon={clickableIcon}
          />
        ))}
    </ul>
  );
}
