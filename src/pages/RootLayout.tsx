import { Outlet } from "react-router-dom";
import Navbar from "../components/UI/Navbar";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function RootLayout() {
  const theme = useSelector((state: RootState) => state.theme.currentTheme);

  return (
    <div
      className={`min-h-full text-color-content bg-color-bg bg-gradient-to-b from-color-gradient-1 to-color-gradient-2 ${theme}`}
    >
      <Navbar />
      <main className={`h-full p-4`}>
        <Outlet />
      </main>
    </div>
  );
}
