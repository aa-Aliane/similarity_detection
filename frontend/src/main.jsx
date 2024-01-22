import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import BoardLayout from "./Layouts/BoardLayout";
import About from "./pages/About";
import Interface from "./pages/Interface";
import Results from "./pages/Results";
import Details from "./pages/Details";
import "./styles/style.css";

const router = createBrowserRouter([
  {
    path: "",
    element: (
      <MainLayout>
        <Outlet />
      </MainLayout>
    ),
    children: [
      {
        path: "/",
        element: (
          <BoardLayout>
            <Outlet />
          </BoardLayout>
        ),
        children: [
          {
            path: "/",
            element: <Interface />,
          },
          {
            path: "/results",
            element: <Results />,
          },
          {
            path: "/details",
            element: <Details />,
          },
        ],
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
