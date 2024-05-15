import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { switchTheme } from "../../store/ThemeSlice";
import { themeIcon } from "../../assets/images";

const links = [
  {
    link: `/`,
    name: "Home",
  },
  {
    link: `/add`,
    name: "Add",
  },
  {
    link: `/load`,
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
        <img src={themeIcon} alt="change theme" />
      </button>
    </nav>
  );
}
