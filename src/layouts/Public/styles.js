import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {},
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  copyright: {
    marginTop: theme.spacing(4),
    whiteSpace: "nowrap",
    [theme.breakpoints.up("md")]: {
      position: "absolute",
      bottom: theme.spacing(2),
    },
  },
}));
