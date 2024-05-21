import { useEffect } from "react";
import { NotificationInterface } from "../../types/custom-types";
import { useDispatch } from "react-redux";
import { clearNotification } from "../../store/NotificationSlice";

interface NotificationProps extends NotificationInterface {}

export default function Notification({
  id,
  text,
  duration,
}: NotificationProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(clearNotification({ id }));
    }, duration);
  });

  return (
      <div className="fixed bottom-10 right-10 px-4 h-10 bg-color-accent flex justify-center items-center rounded-md border-2 border-color-content animate-bounce">
        {text}
      </div>
  );
}
