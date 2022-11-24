import { ActionType } from "../actions/launches";

const initState = {
  loading: false,
  allLaunches: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initState, action) => {
  switch (action.type) {
    case ActionType.LAUNCHES_LOADING:
      return {
        ...state,
        loading: true,
        allLaunches: null,
      };
    case ActionType.LAUNCHES_SUCCESS:
      return {
        ...state,
        loading: false,
        allLaunches: action.payload,
      };
    case ActionType.LAUNCHES_ERROR:
      return {
        ...state,
        loading: false,
        allLaunches: null,
      };
    default:
      return state;
  }
};
