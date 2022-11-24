import React, { useState, useEffect } from "react";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Pagination from "@material-ui/lab/Pagination";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import moment from "moment/moment";
import { useNavigate, useParams } from "react-router-dom";

import useStyles from "./styles";
import Loader from "../../components/Loader";
import { Button, Chip, Grid, Menu, MenuItem } from "@material-ui/core";
import LaunchDetail from "./launchDetail";

const columns = [
  { id: "no", label: "No:", minWidth: 50 },
  { id: "launched", label: "Launched(UTC)", minWidth: 170 },
  { id: "location", label: "Location", minWidth: 100 },
  {
    id: "mission",
    label: "Mission",
    minWidth: 170,
  },
  {
    id: "orbit",
    label: "Orbit",
    minWidth: 170,
  },
  {
    id: "launchStatus",
    label: "Launch Status",
    minWidth: 170,
  },
  {
    id: "rocket",
    label: "Rocket",
    minWidth: 170,
  },
];

function createData(
  no,
  launched,
  location,
  mission,
  orbit,
  launchStatus,
  rocket
) {
  return { no, launched, location, mission, orbit, launchStatus, rocket };
}

const Dashboard = ({ loading, launches, getAllLaunches }) => {
  const classes = useStyles();
  const params = useParams();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [rows, setRow] = useState([]);
  const [launchDialog, setLaunchDialog] = useState(false);
  const [selectedLaunch, setSelectedLaunch] = useState({});

  const [anchorEl, setAnchorEl] = useState(null);

  const selectedFilter = params.filter || "All Launches";

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilterSelect = (event) => {
    setPage(1);
    setAnchorEl(null);
    navigate(`/filter/${event?.target?.innerText}`);
  };

  useEffect(() => {
    getAllLaunches();
  }, [getAllLaunches]);

  useEffect(() => {
    if (launches?.length) {
      let allLaunches = [...launches];
      switch (selectedFilter) {
        case "Upcoming Launches":
          allLaunches = allLaunches.filter((launch) => launch.upcoming);
          break;
        case "Successful Launches":
          allLaunches = allLaunches.filter((launch) => launch.launch_success);
          break;
        case "Failed Launches":
          allLaunches = allLaunches.filter(
            (launch) => !launch.launch_success && !launch.upcoming
          );
          break;
        case "All Launches":
        default:
          break;
      }

      setRow(
        allLaunches?.map((launch) => {
          return createData(
            launch.flight_number.toString().padStart(2, "0"),
            moment(launch.launch_date_utc).format("DD MMMM YYYY HH:mm"),
            launch.launch_site.site_name,
            launch.mission_name,
            launch.rocket.second_stage?.payloads[0]?.orbit,
            <Chip
              label={
                launch.launch_success
                  ? "Success"
                  : launch.upcoming
                  ? "Upcoming"
                  : "Failed"
              }
              color={
                launch.launch_success
                  ? "primary"
                  : launch.upcoming
                  ? "warning"
                  : "secondary"
              }
            />,
            launch.rocket.rocket_name
          );
        })
      );
    }
  }, [launches, selectedFilter]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const launchDetailDialog = (launchNumber) => {
    const launch = launches.find(
      (x) => x.flight_number === Number(launchNumber)
    );
    setSelectedLaunch(launch);
    setLaunchDialog(!launchDialog);
  };

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        className={classes.root}
      >
        <Grid>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            variant="outlined"
            onClick={handleClick}
          >
            {selectedFilter} <KeyboardArrowDownIcon />
          </Button>
        </Grid>
      </Grid>
      <br />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleFilterSelect}>All Launches</MenuItem>
        <MenuItem onClick={handleFilterSelect}>Upcoming Launches</MenuItem>
        <MenuItem onClick={handleFilterSelect}>Successful Launches</MenuItem>
        <MenuItem onClick={handleFilterSelect}>Failed Launches</MenuItem>
      </Menu>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading && (
                <TableRow hover role="checkbox">
                  <TableCell
                    align="center"
                    colspan="7"
                    style={{ minWidth: "100%" }}
                  >
                    <Loader />
                  </TableCell>
                </TableRow>
              )}
              {!loading && rows.length <= 0 && (
                <TableRow hover role="checkbox">
                  <TableCell
                    align="center"
                    colspan="7"
                    style={{ minWidth: "100%", height: "500px" }}
                  >
                    No Results Found For The Specified Filter
                  </TableCell>
                </TableRow>
              )}
              {!loading &&
                rows.slice((page - 1) * 10, (page - 1) * 10 + 10).map((row) => {
                  return (
                    <TableRow
                      hover
                      role="button"
                      onClick={() => launchDetailDialog(row.no)}
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {!loading && rows.length > 0 && (
        <div className={classes.pagination}>
          <Pagination
            color="primary"
            count={Math.floor(rows.length / 10)}
            page={page}
            onChange={handleChangePage}
          />
        </div>
      )}
      {launchDialog && (
        <LaunchDetail
          isOpen={launchDialog}
          handleChange={launchDetailDialog}
          launch={selectedLaunch}
        />
      )}
    </>
  );
};

export default Dashboard;
