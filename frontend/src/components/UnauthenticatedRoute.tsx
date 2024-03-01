import { Navigate, useLocation } from "react-router-dom";
import useSession from "../state/session";

const UnauthenticatedRoute = ({ children }) => {
  const isAuthorized = useSession((state) => !!state.user);
  const location = useLocation();

  if (isAuthorized) {
    //redirect to this route after login
    return (
      <Navigate
        to={"/"}
        replace
        state={{
          redirectTo: location,
        }}
      />
    );
  }

  return <>{children}</>;
};

export default UnauthenticatedRoute;
