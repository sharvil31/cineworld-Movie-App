import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import { RouterProvider } from "react-router-dom";
import ExplorePage from "./pages/ExplorePage.jsx";
import DetailPage from "./pages/DetailPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import axios from "axios";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import Login from "./authentication/Login.jsx";
import Register from "./authentication/Register.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common["Authorization"] = `Bearer ${
  import.meta.env.VITE_ACCESS_TOKEN
}`;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },

      {
        path: "explore",
        element: <ExplorePage />,
      },

      {
        path: "explore/:id",
        element: <DetailPage />,
      },

      {
        path: "search",
        element: <SearchPage />,
      },
    ],
  },

  {
    path: "login",
    element: <Login />,
  },

  {
    path: "register",
    element: <Register />,
  },

  // <ToastContainer />
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
