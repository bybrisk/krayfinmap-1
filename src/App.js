import { ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter} from "react-router-dom";
import {Routing} from './helpers/globalrouter';
import theme from './helpers/theme';
import store from "./redux/store";
import "./App.css";



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
