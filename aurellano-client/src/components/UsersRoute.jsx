import { Navigate } from "react-router-dom";
import UsersPage from "../pages/DashboardPages/UsersPage";

function UsersRoute() {
  const type = localStorage.getItem("type");
  if (type === "editor") {
    return <Navigate to="/dashboard" replace />;
  }
  return <UsersPage />;
}

export default UsersRoute;
