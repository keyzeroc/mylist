import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { switchTheme } from "../../store/ThemeSlice";
const themeSrc = "https://cdn-icons-png.flaticon.com/512/6803/6803223.png";

export default function Navbar() {
  const dispatch = useDispatch();
  return (
    <nav className="w-full h-12 border-b bg-color-accent flex flex-row gap-2 px-4 items-center justify-between">
      <div className="flex gap-2 text-lg">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "underline" : undefined)}
          end
        >
          Home
        </NavLink>
        <NavLink
          to="/add"
          className={({ isActive }) => (isActive ? "underline" : undefined)}
          end
        >
          Add
        </NavLink>
        <NavLink
          to="/load"
          className={({ isActive }) => (isActive ? "underline" : undefined)}
          end
        >
          Load
        </NavLink>
      </div>
      <button
        className="min-w-10 min-h-10 w-10 h-10"
        onClick={() => dispatch(switchTheme())}
      >
        <img src={themeSrc} alt="theme change" />
      </button>
    </nav>
  );
}
