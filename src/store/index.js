import { applyMiddleware, compose, createStore } from "redux";
import { createPromise } from "redux-promise-middleware";
import thunk from "redux-thunk";
import appReducers from "./appReducers";

const store = () => {
  const state = {};
  let enhancer = null;
  if (process.env.NODE_ENV === "production") {
    enhancer = applyMiddleware(
      thunk,
      createPromise({ promiseTypeSuffixes: ["LOADING", "SUCCESS", "ERROR"] })
    );
  } else {
    const reduxIMStateInvariant =
      require("redux-immutable-state-invariant").default;
    const composeEnhancers =
      (typeof window !== "undefined" &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
      compose;

    enhancer = composeEnhancers(
      applyMiddleware(
        thunk,
        createPromise({ promiseTypeSuffixes: ["LOADING", "SUCCESS", "ERROR"] }),
        reduxIMStateInvariant()
      )
    );
  }
  return createStore(appReducers, state, enhancer);
};

export default store();
