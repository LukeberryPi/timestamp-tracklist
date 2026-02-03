import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "@/components/Layout";
import HomePage from "@/pages/HomePage";
import SubmitPage from "@/pages/SubmitPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "submit",
        element: <SubmitPage />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
