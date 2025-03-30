import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useNotification } from "../../hooks/useNotification";

const ProtectedRoute = () => {
  const { currentUser } = useAuth();
  const { showNotification } = useNotification();

  if (currentUser === null) {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      return null;
    }

    return (
      <>
        {showNotification(
          "You must be logged in to navigate to this page",
          "error"
        )}
        <Navigate to="/" replace />;
      </>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
