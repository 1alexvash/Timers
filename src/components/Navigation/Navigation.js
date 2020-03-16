import React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";

const Navigation = () => {
  const activeTab = useStoreState(state => state.navigation.activeTab);
  const setActiveTab = useStoreActions(state => state.navigation.setActiveTab);

  return (
    <div className="Navigation">
      <button
        className={`tab ${activeTab === "timer" && "active"}`}
        onClick={() => setActiveTab("timer")}
      >
        Timer
      </button>
      <button
        className={`tab ${activeTab === "stopwatch" && "active"}`}
        onClick={() => setActiveTab("stopwatch")}
      >
        StopWatch
      </button>
    </div>
  );
};

export default Navigation;
