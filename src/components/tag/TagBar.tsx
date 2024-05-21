import TagsList from "./TagsList";

interface TagBarProps {
  tags: Array<string>;
  onTagSelect: (tag: string) => void;
}

export default function TagBar({ tags, onTagSelect }: TagBarProps) {
  return (
    <div className="flex flex-col max-w-min bg-color-accent/20 p-2 rounded-md">
      <TagsList
        tags={tags}
        clickable={true}
        onTagClick={onTagSelect}
        isFlexCol={true}
      />
    </div>
  );
}
