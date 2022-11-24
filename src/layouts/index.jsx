import React from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import NProgress from "nprogress";
import { Helmet } from "react-helmet";
import PublicLayout from "./Public";

const Layouts = {
  public: PublicLayout,
};

let previousPath = null;
const IndexLayout = ({ children, auth }) => {
  const location = useLocation();

  const { pathname, search } = location;
  const currentPath = pathname + search;

  if (currentPath !== previousPath) {
    NProgress.start();
  }

  setTimeout(() => {
    NProgress.done();
    previousPath = currentPath;
  }, 300);

  const getLayout = () => {
    return "public";
  };

  const Container = Layouts[getLayout()];
  const BootstrappedLayout = () => {
    return <Container>{children}</Container>;
  };

  return (
    <>
      <Helmet titleTemplate="Space-X" />
      {BootstrappedLayout()}
    </>
  );
};

IndexLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default connect(({ auth }) => ({ auth }))(IndexLayout);
