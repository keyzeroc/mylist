const copyPng = "https://cdn-icons-png.flaticon.com/512/1621/1621635.png";
const pastePng = "https://cdn-icons-png.flaticon.com/512/748/748035.png";
import Icon from "../components/UI/Icon";
import { useDispatch, useSelector } from "react-redux";
import { replaceList } from "../store/ListSlice";
import { RootState } from "../store/store";

export default function LoadPage() {
  const list = useSelector((state: RootState) => state.list.list);
  const dispatch = useDispatch();
  const importListHandler = async () => {
    const pastedList = await navigator.clipboard.readText();
    let parsedList;
    try {
      parsedList = await JSON.parse(pastedList);
    } catch (err) {
      alert(`Entered list is not valid JSON, pasted value:\n${pastedList}`);
      return;
    }
    let userReply = prompt(
      "Are you sure you want to replace existing list with the one you pasted in? Please note that existing list will be lost.\nIf you still want to proceed, type 'yes' and press OK"
    );
    if (userReply !== "yes") return;
    dispatch(replaceList({ newList: parsedList }));
  };
  const exportListHandler = async () => {
    await navigator.clipboard.writeText(JSON.stringify(list));
    alert("Exported to clipboard!");
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        <p>Import list in JSON format</p>
        <Icon
          className="min-w-max max-w-min"
          icon={pastePng}
          alt="paste JSON"
          onClick={importListHandler}
        />
      </div>
      <div className="flex flex-row gap-2">
        <p>Export list in JSON format</p>
        <Icon
          className="min-w-max max-w-min"
          icon={copyPng}
          alt="copy JSON"
          onClick={exportListHandler}
        />
      </div>
    </div>
  );
}
