import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import Routes from "./routes";
import Themes from "./themes";
import store from "./store";

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={Themes.default}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  </Provider>
);

export default App;
