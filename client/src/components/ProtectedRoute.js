import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

// Portected route component to handle basic authentication for /main and /questions

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Redirect to login page if not logged in
    toast.error("Vous devez être connecté pour accéder à cette page.");
    console.log("Unauthenticated user");
    return <Navigate to="/" />;
  }
  return children;
}

export default ProtectedRoute;
