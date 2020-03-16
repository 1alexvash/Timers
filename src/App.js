import React, { Fragment } from "react";
import Navigation from "./components/Navigation/Navigation";
import Stopwatch from "./components/Stopwatch/Stopwatch";
import Timer from "./components/Timer/Timer";
import "./scss/main.css";

import { StoreProvider, useStoreState } from "easy-peasy";

import store from "./store";

const App = () => {
  const activeTab = useStoreState(state => state.navigation.activeTab);
  const page = activeTab === "timer" ? <Timer /> : <Stopwatch />;

  return (
    <Fragment>
      <div className="App">
        <Navigation />
        {page}
      </div>
    </Fragment>
  );
};

export default () => (
  <StoreProvider store={store}>
    <App />
  </StoreProvider>
);
