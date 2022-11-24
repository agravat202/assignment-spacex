import React from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import useStyles from "./styles";

const Header = () => {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <img
          className={classes.logo}
          src="/static/icons/spacex.svg"
          alt="SpaceX"
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
