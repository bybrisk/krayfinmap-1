import { ThemeProvider } from "@material-ui/core/styles";
import React,{useEffect,Suspense} from "react";
import { Provider } from "react-redux";
import { BrowserRouter} from "react-router-dom";
import { useDispatch } from "react-redux";
import { Route, Switch ,useHistory} from "react-router-dom";
import {PrivateRoute} from './helpers/PrivateRoute'

import theme from './helpers/Theme';
import store from "./redux/store";
import "./App.css";




const ViewApp = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ './views/app/dashboard/drawer')
);
const ViewUser = React.lazy(() =>
  import(/* webpackChunkName: "views-user" */ "./components/user/slider/Slider")
);
// const ViewError = React.lazy(() =>
//   import(/* webpackChunkName: "views-error" */ './views/error')
// );
const Routing = () => {
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
    }, [dispatch,history]);
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

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <BrowserRouter>
<Routing/>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export const domain =
  "http://localhost:5000";
  // https://bybriskbackend.herokuapp.com