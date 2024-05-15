import { useDispatch, useSelector } from "react-redux";
import { replaceList } from "../store/ListSlice";
import { RootState } from "../store/store";
import { pushNotification } from "../store/NotificationSlice";
import { NotificationInterface } from "../types/custom-types";

export default function LoadPage() {
  const list = useSelector((state: RootState) => state.list.list);
  const dispatch = useDispatch();

  const importListHandler = async () => {
    const pastedList = await navigator.clipboard.readText();
    let parsedList;
    try {
      parsedList = await JSON.parse(pastedList);
    } catch (err) {
      const notification: NotificationInterface = {
        text: "Entered list is not valid JSON, please check and try again!",
        duration: 3000,
      };
      dispatch(pushNotification({ notification }));
      return;
    }
    let userConfirm = confirm(
      "Are you sure you want to replace the existing list? Please note that the existing list will be lost.\nIf you still want to proceed press OK."
    );
    if (!userConfirm) return;
    dispatch(replaceList({ newList: parsedList }));
    const notification: NotificationInterface = {
      text: "List replaced!",
      duration: 3000,
    };
    dispatch(pushNotification({ notification }));
  };

  const exportListHandler = async () => {
    await navigator.clipboard.writeText(JSON.stringify(list));
    const notification: NotificationInterface = {
      text: "List copied to clipboard!",
      duration: 3000,
    };
    dispatch(pushNotification({ notification }));
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-[50%] flex flex-col gap-2">
        <button
          onClick={importListHandler}
          className="bg-color-accent rounded-md p-2 items-center"
        >
          Import list in JSON format
        </button>
        <button
          onClick={exportListHandler}
          className="bg-color-accent rounded-md p-2 items-center"
        >
          Export list in JSON format
        </button>
      </div>
    </div>
  );
}
