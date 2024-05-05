import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import AddItemPage from "./pages/AddItemPage";
import LoadPage from "./pages/LoadPage";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <RootLayout />,
//     errorElement: <ErrorPage />,
//     children: [
//       { path: "", element: <HomePage /> },
//       { path: "add", element: <AddItemPage /> },
//       { path: "load", element: <LoadPage /> },
//     ],
//   },
// ]);
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "mylist",
        element: <HomePage />,
        children: [
          { path: "add", element: <AddItemPage /> },
          { path: "load", element: <LoadPage /> },
        ],
      },
    ],
  },
]);
export default function App2() {
  return <RouterProvider router={router} />;
}
