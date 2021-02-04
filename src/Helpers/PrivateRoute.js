import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const logged = useSelector((state) => state.login);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (logged) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};
