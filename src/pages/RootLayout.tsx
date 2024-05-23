import { Outlet } from "react-router-dom";
import Navbar from "../components/UI/Navbar";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Notifications from "../components/notification/Notifications";

export default function RootLayout() {
  const theme = useSelector((state: RootState) => state.theme.currentTheme);

  return (
    <>
      <div
        className={`min-h-full text-color-content bg-color-bg bg-gradient-to-b from-color-gradient-1 to-color-gradient-2 font-['Jaldi'] ${theme}`}
      >
        <Notifications />
        <Navbar />
        <main className={`h-full pt-10 pb-10 px-4 md:px-10 2xl:px-20`}>
          <Outlet />
        </main>
      </div>
    </>
  );
}
