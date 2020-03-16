import React, { useState, useEffect, Fragment } from "react";
import stopwatchImg from "../../images/stopwatch.png";

// Add picture of stopwatch
// Add reset button

const Stopwatch = () => {
  const [active, setActive] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // console.log(active);
      if (active === true) {
        setSeconds(seconds => Math.round((seconds + 1 / 40) * 100) / 100);
      }
    }, 1000 / 40);
    return () => clearInterval(interval);
  }, [active]);

  const restart = () => {
    setActive(false);
    setSeconds(0);
  };

  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    let milliseconds = time.toString().split(".")[1];
    if (milliseconds === undefined) {
      milliseconds = "00";
    }
    if (milliseconds.length === 1) {
      milliseconds += "0";
    }
    console.log(milliseconds.length);

    return (
      <Fragment>
        {minutes > 0 ? (
          <Fragment>
            {minutes}
            <span className="letter">m</span>
          </Fragment>
        ) : (
          ""
        )}{" "}
        {seconds}
        <span className="letter">s</span> {milliseconds}
      </Fragment>
    );
  };

  return (
    <div className="Stopwatch">
      <img
        src={stopwatchImg}
        alt="stopwatch"
        className={`pic ${active && "active"}`}
      />
      <div className="time-passed">{formatTime(seconds)}</div>
      <div className="controllers">
        <button className="start" onClick={() => setActive(!active)}>
          {active ? "Stop" : "Start"}
        </button>
        <button
          className="restart"
          disabled={seconds === 0}
          onClick={() => restart()}
        >
          Restart
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
