import Icon from "./Icon";
import { confirmIcon, closeIcon } from "../../assets/images";
import { useState } from "react";

type ModalProps = {
  type: "info" | "prompt" | "confirm";
  header: string;
  body: string;
  onConfirm?: () => void;
};

export default function Modal({ type, header, body, onConfirm }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const onCloseHandler = () => {
    setIsOpen((prevState) => (prevState === true ? !prevState : prevState));
  };

  return isOpen ? (
    <div className="absolute inset-0 bg-black/30 min-h-full min-w-full w-full h-full">
      <div className="mt-[10%] mx-auto w-[70%] h-[40%] flex flex-col opacity-90 bg-color-bg rounded-md">
        <div className="bg-color-accent text-lg text-center rounded-t-md p-1 px-2 flex flex-row">
          <p className="flex-1">{header}</p>
          <div className="self-end mr-1">
            <Icon icon={closeIcon} alt="x" onClick={onCloseHandler} />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <p className="flex-1 p-1 px-2">{body}</p>
          {type === "confirm" && (
            <div className="flex flex-row rounded-b-md overflow-auto h-10">
              <Icon
                className="bg-color-accent"
                icon={confirmIcon}
                alt="confirm"
                onClick={onConfirm}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
