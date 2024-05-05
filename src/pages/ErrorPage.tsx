import { useRouteError, isRouteErrorResponse } from "react-router";
import Navbar from "../components/UI/Navbar";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";

export default function ErrorPage() {
  const error = useRouteError();
  const theme = useSelector((state: RootState)=>state.theme.currentTheme);
  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.data.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = "Unknown error";
  }

  return (
    <div
      className={`min-h-full text-color-content bg-color-bg bg-gradient-to-b from-color-gradient-1 to-color-gradient-2 ${theme}`}
    >
      <Navbar />
      <main className="m-auto p-4">{errorMessage}</main>
    </div>
  );
}
