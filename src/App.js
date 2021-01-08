import { createMuiTheme, responsiveFontSizes, ThemeProvider } from "@material-ui/core/styles";
import React,{useEffect} from "react";
import { Provider,useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch ,useHistory} from "react-router-dom";
// import ForgotPassword from "./Authentication/ForgotPassword";
import Login from "./Registration/Forms/Login";
import Signup from "./Registration/Forms/Signup";
// import UpdateAccount from "./Authentication/UpdateAccount";
import Home from "./Components/ByBriskSidebar/BybriskDrawer";
import { PrivateRoute } from "./Helpers/PrivateRoute";
import Slider from "./Components/Slider/Slider";
import store from "./Redux/Store";
import DeliveryAgent from './Components/AgentTable/DeliveryTable/DeliveryTable'
import "./App.css";
const Routing = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const bybId = JSON.parse(localStorage.getItem("bybId"));
console.log(bybId,user)
    if (bybId) {
      dispatch({ type: "LOG_IN", payload: true });
      dispatch({
        type: "ID",
        payload:bybId
      })
    }
    history.push('/home')
  }, []);
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
      xs: 300,
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
  fontSize:'1rem',
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
          <BrowserRouter>
<Routing/>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export const domain =
  "https://bybriskbackend.herokuapp.com";
