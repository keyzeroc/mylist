import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { switchTheme } from "../../store/ThemeSlice";
import { themeIcon } from "../../assets/images";
import Icon from "./Icon";

const links = [
  {
    link: `/`,
    name: "List",
  },
  {
    link: `/add`,
    name: "Add",
  },
  {
    link: `/load`,
    name: "Import/Export",
  },
];

export default function Navbar() {
  const dispatch = useDispatch();
  return (
    <nav className="w-full flex flex-row gap-2 p-6 uppercase justify-end">
      {/* <div className="flex items-baseline self-start">
        <a href="https://github.com/keyzeroc/mylist" target="_blank">
          <Icon iconClassName={"w-8 h-8"} icon={githubIcon} alt="github" />
        </a>
        <p>keyzeroc</p>
      </div> */}
      <div className="flex gap-8 items-center text-2xl">
        {links.map((link) => (
          <NavLink
            key={"nav:" + link.link}
            to={link.link}
            className={({ isActive }) =>
              (isActive ? "bg-color-accent/40" : undefined) +
              " px-2 hover:bg-color-accent/20 rounded-md"
            }
            end
          >
            {link.name}
          </NavLink>
        ))}
        <Icon
          iconClassName={"w-8 h-8"}
          icon={themeIcon}
          alt="switch theme"
          onClick={() => dispatch(switchTheme())}
        />
      </div>
    </nav>
  );
}
