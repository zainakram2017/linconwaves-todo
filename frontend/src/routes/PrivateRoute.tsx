import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Layout } from "../components";
import { UserProvider } from "../contexts/UserContext";
import { TaskProvider } from "../contexts/TaskContext";

const PrivateRoute: FC = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <UserProvider>
      <TaskProvider>
        <Layout>
          <Outlet />
        </Layout>
      </TaskProvider>
    </UserProvider>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
