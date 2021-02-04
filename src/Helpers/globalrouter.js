import React,{Suspense, useEffect} from "react";


import { useDispatch } from "react-redux";
import {PrivateRoute} from './privateRoute'
import { Route, Switch ,useHistory,Redirect} from "react-router-dom";

const ViewApp = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ 'views/app/dashboard/drawer')
);
const ViewUser = React.lazy(() =>
  import(/* webpackChunkName: "views-user" */ "components/user/slider/Slider")
);
const ViewError = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ 'views/error')
);
export const Routing = () => {
    const dispatch = useDispatch();
    const history = useHistory();
  
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      const bybId = JSON.parse(localStorage.getItem("bybId"));
      if (bybId) {
        dispatch({ type: "LOG_IN", payload: true });
        dispatch({
          type: "ID",
          payload:bybId
        })
      }
      history.push('/dashboard')
    }, []);
    return (
      <Suspense fallback={<div className="loading" />}>
<Switch>
        <Route exact path="/"
                      render={(props) => <ViewUser {...props} />}

         />
        {/* <PrivateRoute path="/forgotpassword" component={ForgotPassword} />
        <PrivateRoute path="/updateAccount" component={UpdateAccount} />*/}
        <PrivateRoute path="/dashboard" 
        component={ViewApp}
        />
        {/* <Redirect to="/error" /> */}
      </Switch>
      </Suspense>
      
    );
  };