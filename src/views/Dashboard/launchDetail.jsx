import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import {
  Typography,
  IconButton,
  Dialog,
  Chip,
  Grid,
  Link,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import YouTubeIcon from "@material-ui/icons/YouTube";
import DescriptionIcon from "@material-ui/icons/Description";
import InfoIcon from "@material-ui/icons/Info";
import moment from "moment/moment";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  launchLogo: {
    width: 100,
  },
  launchData: {
    width: "100%",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    "& .MuiListItem-gutters:not(:last-child)": {
      borderBottom: `1px solid ${theme.palette.grey[500]}`,
      paddingLeft: 5,
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      "& .MuiListItemText-root": {
        width: 160,
      },
      "& ::not(:last-child)": {},
    },
    missionName: {
      fontSize: 16,
    },
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const LaunchDetail = withStyles(styles)(
  ({ classes, isOpen, handleChange, launch }) => {
    return (
      <>
        <Dialog
          onClose={handleChange}
          aria-labelledby="customized-dialog-title"
          open={isOpen}
        >
          <DialogTitle id="customized-dialog-title" onClose={handleChange}>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="stretch"
              spacing={4}
            >
              <Grid item>
                <img
                  className={classes.launchLogo}
                  src={launch.links.mission_patch_small}
                  alt="Mission Logo"
                />
              </Grid>
              <Grid item>
                <Typography
                  className={classes.missionName}
                  variant="h4"
                  component="h4"
                >
                  {launch.mission_name}
                </Typography>
                <Typography variant="subtitle1" component="p">
                  {launch.rocket.rocket_name}
                </Typography>
                <Typography variant="span" component="span">
                  <Link href={launch.links.article_link} target="_blank">
                    <InfoIcon />
                  </Link>
                  <Link href={launch.links.wikipedia} target="_blank">
                    <DescriptionIcon />
                  </Link>
                  <Link href={launch.links.video_link} target="_blank">
                    <YouTubeIcon />
                  </Link>
                </Typography>
              </Grid>
              <Grid item>
                <Chip
                  label={launch.launch_success ? "Success" : "Failed"}
                  color={launch.launch_success ? "primary" : "secondary"}
                />
              </Grid>
            </Grid>
          </DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              {launch.details}&nbsp;
              <Link href={launch.links.wikipedia} target="_blank">
                Wikipedia
              </Link>
            </Typography>
            <List
              component="nav"
              className={classes.launchData}
              aria-label="contacts"
            >
              <ListItem button>
                <ListItemText primary="Flight Number" />
                <ListItemText secondary={launch.flight_number} />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Mission Name" />
                <ListItemText secondary={launch.mission_name} />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Rocket Type" />
                <ListItemText secondary={launch.rocket.rocket_type} />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Rocket Name" />
                <ListItemText secondary={launch.rocket.rocket_name} />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Manufacturer" />
                <ListItemText secondary="SpaceX" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Nationality" />
                <ListItemText secondary="SpaceX" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Launch Date" />
                <ListItemText
                  secondary={moment(launch.launch_date_utc).format(
                    "DD MMMM YYYY HH:mm"
                  )}
                />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Payload Type" />
                <ListItemText
                  secondary={
                    launch.rocket.second_stage?.payloads[0]?.payload_type
                  }
                />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Orbit" />
                <ListItemText
                  secondary={launch.rocket.second_stage?.payloads[0]?.orbit}
                />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Launch Site" />
                <ListItemText secondary={launch.launch_site.site_name} />
              </ListItem>
            </List>
          </DialogContent>
        </Dialog>
      </>
    );
  }
);

export default LaunchDetail;
