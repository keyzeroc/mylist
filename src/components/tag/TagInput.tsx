import { Input } from "../UI/Input";
import TagsList from "./TagsList";
import { IMAGES } from "../../assets/images";
import { useTags } from "../../hooks/useTags";
import { useEffect } from "react";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

interface TagInputProps {
  type: "new" | "edit";
  oldTags: string[];
  onTagsChange: (tags: string[]) => void;
}

export default function TagInput({
  type,
  oldTags,
  onTagsChange,
}: TagInputProps) {
  const notifications = useSelector(
    (state: RootState) => state.notifications.notifications
  );

  const {
    itemTagRef,
    tags,
    suggestedTags,
    onRemoveTagHandler,
    onAddTagHandler,
    suggestTags,
    clearTags,
  } = useTags({ oldTags });

  useEffect(() => {
    onTagsChange(tags);
  }, [tags]);

  useEffect(() => {
    if (notifications.find((noti) => noti.text === "Item has been added!")) {
      clearTags();
    }
  }, [notifications]);

  return (
    <div className={`flex flex-col ${type === "edit" && "px-2"}`}>
      <div className="flex flex-col relative">
        <Input
          autocomplete="off"
          name="tag"
          ref={itemTagRef}
          onChangeCallback={suggestTags}
          className="flex-1"
          label={`${
            type === "new" ? "Add" : "Edit"
          } tags: (press Enter to add tag)`}
          onKeyDownCallback={onAddTagHandler}
        />
        {suggestedTags.length > 0 && (
          <div className="absolute top-full left-0 right-0 bottom-0 z-10 border bg-color-gradient-1 border-color-accent rounded-md w-full min-h-fit max-h-48 overflow-auto">
            <ul>
              {suggestedTags.map((tag) => (
                <li
                  key={"st:" + tag}
                  className="hover:bg-color-accent"
                  onClick={() => {
                    //@ts-ignore
                    itemTagRef.current!.value = tag;
                    onAddTagHandler();
                  }}
                >
                  <button type="button">{tag}</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className={`py-1`}>
        <TagsList
          tags={tags}
          clickable={true}
          clickableIcon={IMAGES.delete.image}
          onTagClick={onRemoveTagHandler}
        />
      </div>
    </div>
  );
}
