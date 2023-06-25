import { Outlet } from "react-router-dom";
import AuthProvider from "../context/AuthProvider";
import AppProvider from "../context/AppProvider";

const AuthLayout: React.FC = () => {
  return (
    <AuthProvider>
      <AppProvider>
        <Outlet />
      </AppProvider>
    </AuthProvider>
  );
};

export default AuthLayout;
