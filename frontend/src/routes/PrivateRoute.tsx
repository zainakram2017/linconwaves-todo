import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Layout } from "../components";
import { UserProvider } from "../contexts/UserContext";

const PrivateRoute: FC = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <UserProvider>
      <Layout>
        <Outlet />
      </Layout>
    </UserProvider>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
