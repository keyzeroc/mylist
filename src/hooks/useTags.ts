import { useRef, useState } from "react";
import { useTagsList } from "./useTagsList";

interface useTagsProps {
  oldTags: string[]
}

export const useTags = ({ oldTags }: useTagsProps) => {

  const [tagList] = useTagsList();
  const [tags, setTags] = useState<Array<string>>(oldTags || []);
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  const itemTagRef = useRef<HTMLInputElement | null>(null);

  const onAddTagHandler = () => {
    const tag = itemTagRef.current!.value;
    if (tag.trim() === "") return;
    if (tags.includes(tag)) return;
    setTags((prevTags) => [...prevTags, tag]);
    itemTagRef.current!.value = "";
    setSuggestedTags([]);
    itemTagRef.current!.focus();
  };

  const onRemoveTagHandler = (tag: string) => {
    const foundTag = tags.find((currentTag) => currentTag === tag);
    if (!foundTag) return;
    setTags((prevTags) => prevTags.filter((currentTag) => currentTag !== tag));
  };

  const suggestTags = (userTagValue: string) => {
    itemTagRef.current!.value = userTagValue;
    if (userTagValue.trim() === "") {
      setSuggestedTags([]);
      return;
    }
    const suggestedTags = tagList.filter((tag) => tag.includes(userTagValue) && !tags.includes(tag));
    if (suggestTags.length > 0) setSuggestedTags(suggestedTags);
  };

  const clearTags = () => {
    itemTagRef.current!.value = "";
    setTags([]);
    setSuggestedTags([]);
  }

  return { itemTagRef, tags, suggestedTags, onRemoveTagHandler, onAddTagHandler, suggestTags, clearTags };

}