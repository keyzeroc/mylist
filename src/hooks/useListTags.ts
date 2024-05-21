import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect, useState } from "react";

export const useListTags = () => {
  const list = useSelector((state: RootState) => state.list.list);
  const [tagList, setTagList] = useState<string[]>([]);

  useEffect(() => {
    const newTagList = getAllTags();
    setTagList(newTagList);
  }, [list])

  const getAllTags = (): Array<string> => {
    const uniqueTags = new Array<string>();
    list.forEach((item) => {
      item.tags?.forEach((tag) => {
        if (!uniqueTags.includes(tag)) uniqueTags.push(tag);
      });
    });
    return uniqueTags;
  };
  return [tagList];
}