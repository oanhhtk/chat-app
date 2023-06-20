import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import ProtectedRoute from "./ProtectedRoute";
import ErrorPage from "../components/ErrorPage";
import Login from "../components/Login";
import ChatRoom from "../components/ChatRoom";

export default createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Login />,
        path: "/login",
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <ChatRoom />,
            path: "/",
          },
        ],
      },
    ],
  },
]);
