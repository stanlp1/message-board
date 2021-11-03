import { Route, Redirect } from "react-router";
import { useAppSelector } from "../../app/hooks";

const AuthRoute = ({ children, ...rest }: any) => {
  const loggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        loggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default AuthRoute;
