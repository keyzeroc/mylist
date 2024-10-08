import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { switchTheme } from "../../store/ThemeSlice";
import { IMAGES } from "../../assets/images";
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
    <nav className="w-full flex flex-row gap-2 p-6 uppercase">
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
      </div>
      <div className="flex gap-8 ml-auto">
        <Icon
          iconClassName={"w-8 h-8"}
          icon={IMAGES.theme.image}
          alt={IMAGES.theme.alt}
          onClick={() => dispatch(switchTheme())}
        />
        <a
          className="shrink-0"
          href="https://github.com/keyzeroc/mylist"
          target="_blank"
        >
          <Icon
            iconClassName={"w-8 h-8"}
            icon={IMAGES.github.image}
            alt={IMAGES.github.alt}
          />
        </a>
      </div>
    </nav>
  );
}
