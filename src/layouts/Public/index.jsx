import React from "react";
import PropTypes from "prop-types";
import useStyles from "./styles";
import Header from "../../components/Header";

const Public = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.content}>{children}</div>
    </div>
  );
};

Public.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Public;
