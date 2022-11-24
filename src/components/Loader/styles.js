import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
  loaderContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "200px",
  },
  progress: {
    margin: theme.spacing(2),
  },
  colorSecondary: {
    color: "#8353a3",
  },
}));
