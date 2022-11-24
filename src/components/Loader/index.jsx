import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import useStyles from "./styles";

function Loader() {
  const classes = useStyles();
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    function tick() {
      setProgress((oldProgress) => (oldProgress >= 100 ? 0 : oldProgress + 1));
    }
    const timer = setInterval(tick, 50);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div className={classes.loaderContainer}>
      <CircularProgress
        size={50}
        thickness={3}
        classes={{ root: classes.colorSecondary }}
        variant="determinate"
        value={progress}
        color="secondary"
      />
    </div>
  );
}

Loader.propTypes = {};

export default Loader;
