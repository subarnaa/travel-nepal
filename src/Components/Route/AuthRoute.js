import { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import ReactGA from "react-ga";
import { useQuery } from "react-query";
import { useAuth } from "../../user-contex";

import LoadingIndicator from "../LoadingIndicator";

import { getUser } from "../../services/user";

const AuthRoute = ({ component: Component, ...rest }) => {
  const [, userDispatch] = useAuth();

  // turned off by default, manual refetch is needed
  const { error, isLoading, data } = useQuery("fetchUsers", getUser, {
    retry: false,
    // enabled: false,
  });

  useEffect(() => {
    if (data) {
      userDispatch({ type: "login", payload: { user: data } });
    }
  }, [data, userDispatch]);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoading) return <LoadingIndicator />;
        if (error) return <Redirect to="/login" />;
        ReactGA.pageview(props.location.pathname);
        return <Route {...rest} component={Component} />;
      }}
    />
  );
};

export default AuthRoute;
