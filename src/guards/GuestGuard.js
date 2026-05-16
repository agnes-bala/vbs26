import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
// hooks
// import useAuth from '../hooks/useAuth';
// routes
import { PATH_DASHBOARD } from '../routes/paths';
// components
// import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
  children: PropTypes.node,
};

export default function GuestGuard({ children }) {
 

  const jwt = localStorage.getItem("jwt");
  // const location = useLocation();

  if (jwt) {
    return <Navigate to={PATH_DASHBOARD.root} />;
  }

  return <>{children}</>;
}
