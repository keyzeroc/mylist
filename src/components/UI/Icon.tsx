import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
type Props = {
  icon: string;
  alt: string;
  onClick?: () => void;
  className?: string;
  type?: "submit" | "button" | "reset";
};

function Icon({
  icon,
  alt,
  onClick,
  className,
  type = "button",
}: Props) {
  const theme = useSelector((state: RootState) => state.theme.currentTheme);
  return (
    <button
      type={type}
      className={`rounded-sm w-full flex justify-center items-center hover:bg-color-accent-2 p-1 ${className}`}
      onClick={onClick}
    >
      <img
        className={`w-4 h-4 ${
          theme === "dark" ? "invert" : ""
        }`}
        src={icon}
        alt={alt}
      />
    </button>
  );
}

export default Icon;
