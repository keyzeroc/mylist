import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
type Props = {
  icon: string;
  alt: string;
  onClick?: () => void;
  className?: string;
};

function Icon({ icon, alt, onClick, className }: Props) {
  const theme = useSelector((state: RootState) => state.theme.currentTheme);
  return (
    <button
      className={`rounded-sm w-full flex justify-center hover:bg-color-accent-2 py-1 ${className}`}
      onClick={onClick}
    >
      <img
        className={`w-4 h-4 ${theme === "dark" ? "invert" : ""}`}
        src={icon}
        alt={alt}
      />
    </button>
  );
}

export default Icon;
