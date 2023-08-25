import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
const PrivateRoute = ({ children }) => {
  // const isAuthenticated = useSelector(state => state)
  const isAuthenticated = false;
  console.log("!!!!!!!!", isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

export default PrivateRoute;
