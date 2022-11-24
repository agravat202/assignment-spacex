import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
  root: {
    maxWidth: "90%",
    margin: "0 auto",
  },
  container: {
    maxHeight: "70vh",
    "& .MuiTableCell-stickyHeader": {
      backgroundColor: "#e1e1e1",
    },
  },
  pagination: {
    width: "90%",
    display: "flex",
    justifyContent: "end",
    margin: "0 auto",
    "& > *": {
      marginTop: theme.spacing(2),
      borderTop: "1px solid",
      borderBottom: "1px solid",
    },
    "& .MuiPaginationItem-ellipsis": {
      height: 32,
    },
    "& button": {
      borderRadius: "unset",
      margin: "0",
    },
    "& li:not(:last-child)": {
      borderRight: "1px solid",
    },
    "& li:last-child": {
      borderRight: "1px solid",
    },
    "& li:first-child": {
      borderLeft: "1px solid",
    },
  },
}));
