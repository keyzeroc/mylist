import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { switchTheme } from "../../store/ThemeSlice";
const themeSrc = "https://cdn-icons-png.flaticon.com/512/6803/6803223.png";

const links = [
  {
    link: `/mylist/`,
    name: "Home",
  },
  {
    link: `/mylist/add`,
    name: "Add",
  },
  {
    link: `/mylist/load`,
    name: "Load",
  },
];

export default function Navbar() {
  const dispatch = useDispatch();
  return (
    <nav className="w-full h-12 border-b bg-color-accent flex flex-row gap-2 px-4 items-center justify-between">
      <div className="flex gap-2 text-lg">
        {links.map((link) => (
          <NavLink
            key={"nav:" + link.link}
            to={link.link}
            className={({ isActive }) => (isActive ? "underline" : undefined)}
            end
          >
            {link.name}
          </NavLink>
        ))}
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
