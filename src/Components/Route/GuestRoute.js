import { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import ReactGA from "react-ga";
import { useQuery } from "react-query";
import { useAuth } from "../../user-contex";

import LoadingIndicator from "../LoadingIndicator";

import { getUser } from "../../services/user";

const GuestRoute = ({ component: Component, ...rest }) => {
  const [, userDispatch] = useAuth();
  const { error, isLoading, data } = useQuery("fetchUsers", getUser, {
    retry: false,
  });

  useEffect(() => {
    if (error) {
      userDispatch({ type: "login", payload: { user: false } });
    }
  }, [error, userDispatch]);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoading) return <LoadingIndicator />;
        if (data) return <Redirect to="/" />;
        if (error) {
          ReactGA.pageview(props.location.pathname);
          return <Route {...rest} component={Component} />;
        }
      }}
    />
  );
};

export default GuestRoute;
