import { Navigate, Outlet } from 'react-router-dom';

type PrivateRouteProps = {
  children: JSX.Element;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
