import { connect } from "react-redux";
import { Actions } from "../actions/launches";
import Dashboard from "../views/Dashboard";

const mapStateToProps = (state) => ({
  loading: state.launches.loading,
  launches: state.launches.allLaunches,
});

const mapDispatchToProps = (dispatch) => ({
  getAllLaunches: () => dispatch(Actions.allLaunches()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
