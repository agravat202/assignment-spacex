import { getAllLaunches } from "../api";

export const ActionType = {
  LAUNCHES: "LAUNCHES",
  LAUNCHES_LOADING: "LAUNCHES_LOADING",
  LAUNCHES_SUCCESS: "LAUNCHES_SUCCESS",
  LAUNCHES_ERROR: "LAUNCHES_ERROR",
};

export const Actions = {
  allLaunches: (filter) => {
    return {
      type: ActionType.LAUNCHES,
      payload: getAllLaunches(filter),
    };
  },
};
