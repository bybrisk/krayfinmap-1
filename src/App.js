import { createMuiTheme, responsiveFontSizes, ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import ForgotPassword from "./Authentication/ForgotPassword";
import Login from "./Registration/Forms/Login";
import Signup from "./Registration/Forms/Signup";
// import UpdateAccount from "./Authentication/UpdateAccount";
import Home from "./Components/ByBriskSidebar/BybriskDrawer";
import { PrivateRoute } from "./Helpers/PrivateRoute";
import Slider from "./Components/Slider/Slider";
import store from "./Redux/Store";
import "./App.css";
import Registration from "./Registration";
import Bybriskdropdown from './Components/ByBriskSidebar/BybriskDropdown'
import Bybriskdrawer from './Components/ByBriskSidebar/BybriskDrawer'
import EnhancedToolbar from './Components/BybriskTable/EnhancedToolbar'
import AddAgent from './Components/AddAgent/AddAgent'
import BybriskTable from "./Components/BybriskTable/BybriskTable";
const Routing = () => {
  // const dispatch = useDispatch();
  // var data = useSelector((state) => state.user);
  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   const jwt = JSON.parse(localStorage.getItem("token"));
  //   if (user) {
  //     dispatch({ type: "LOG_IN", payload: true });
  //   }
  // }, [dispatch]);
  // console.log(data.role);
  return (
    <Switch>
      <Route exact path="/" component={Slider} />
      {/* <PrivateRoute path="/forgotpassword" component={ForgotPassword} />
      <PrivateRoute path="/updateAccount" component={UpdateAccount} />*/}
      <PrivateRoute path="/home" component={Home} /> 

      <Route path="/Signup" component={Signup} />
      {/* <Route>
        <Error />
      </Route> */}
    </Switch>
  );
};

let theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 450,
      md: 800,
      lg: 1000,
      xl: 1400
    }
  },
  palette: {
    secondary: {
      main: "#4caf50"
    },
    primary: {
      main: "#057g78"
    }
  },
  typography: {
    fontFamily: "Comic Sans MS"
  },
  
  spacing: 8,
  overrides: {
    MuiOutlinedInput: {
      root: {
        maxWidth: 400,
        borderRadius:60
      }
    },
    MuiIconButton:{
root:{
  color:'#ffffff'
}
    },
    MuiAccordion:{
      root:{
background:'#061336',
color:'#ffffff'
      }
    },
    MuiToolbar:{
root:{
  // background:'#061336'
}
    },
    MuiListItemIcon:{
      root:{
color:'#ffffff'
      }
    },
    MuiFormLabel:{
root:{
  fontSize:'1.3rem',
  color:'#000000'
}
    },
 
    MuiAccordionDetails:{
root:{
  flexDirection:'column',
  paddingLeft:"2rem",
  backgroundColor:'#142245',
  textAlign:'left'
}
    },
    MuiDrawer:{
      paper:{
        backgroundColor:'#061336',
        color:'#ffffff'
      }
    },
    MuiTableSortLabel:{
      icon:{
color:'#ffffff'
      }
    }	,
    MuiButton: {
      root: {
        maxWidth: 300,
        width: "100%"
      }
    },
    MuiPaper:{
      rounded:{
        borderRadius:12
      }
        },
        
  },
  
  props: {
    MuiCheckbox: {
      disableRipple: true
    }  }
});

theme = responsiveFontSizes(theme)
export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <div className="App">
<BybriskTable/>
          <BrowserRouter>
<Routing/>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export const domain =
  "https://developers.bybrisk.com";
