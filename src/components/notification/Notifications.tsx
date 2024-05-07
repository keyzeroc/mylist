import { RootState } from "../../store/store";
import Notification from "./Notification";
import { useSelector } from "react-redux";

type Props = {};

export default function Notifications({}: Props) {
  const notifications = useSelector(
    (state: RootState) => state.notifications.notifications
  );
  return (
    <ul className="absolute bottom-[2%] right-[2%] flex flex-col gap-4">
      {notifications.map((noti) => (
        <Notification
          key={"noti:" + noti.id}
          id={noti.id}
          text={noti.text}
          duration={noti.duration}
        />
      ))}
    </ul>
  );
}
