import AppRoutes from "./AppRoutes/AppRoutes";
import { AuthProvider } from "./Context/AuthContext";
import { CategoryProvider } from "./Context/CategoryContext";
import { NotificationProvider } from "./Context/NotificationContext";

const App = () => {
  return (
    <>
      <NotificationProvider>
        <AuthProvider>
          <CategoryProvider>
            <AppRoutes />
          </CategoryProvider>
        </AuthProvider>
      </NotificationProvider>
    </>
  );
};
export default App;
