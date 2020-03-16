import React, { Fragment, useState, useEffect, useRef } from "react";
import timeLeft from "./timeLeft";
import timerSound from "./timerSound.mp3";

import soundOnImg from "../../images/soundOn.png";
import soundOffImg from "../../images/soundOff.png";

const Timer = () => {
  const inputMinutes = useRef();
  const inputSeconds = useRef();
  const inputStart = useRef();
  const inputSound = useRef();

  const [time, setTime] = useState({
    hours: "",
    minutes: "",
    seconds: ""
  });
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [pause, setPause] = useState(false);
  const [soundOn, setSoundOn] = useState(true);

  const start = () => setTimerActive(true);

  const reset = () => {
    setTimerActive(false);
    setSecondsLeft(0);
  };

  // Play sound when timer finishes
  useEffect(() => {
    return () => {
      if (timerActive && secondsLeft === 0 && soundOn) {
        inputSound.current.play();
      } else {
        // eslint-disable-next-line
        inputSound.current.pause();
      }
    };
  }, [secondsLeft, timerActive, soundOn]);

  useEffect(() => {
    let interval;
    if (timerActive && secondsLeft > 0) {
      interval = setInterval(() => {
        if (!pause) {
          setSecondsLeft(secondsLeft - 1);
        }
      }, 1000);
    } else {
      setTimerActive(false);
      setTotalTime();
    }
    return () => {
      console.log("this", timerActive, secondsLeft);
      clearInterval(interval);
    };
    // eslint-disable-next-line
  }, [timerActive, secondsLeft, pause]);

  useEffect(() => {
    setTotalTime();
    // eslint-disable-next-line
  }, [time]);

  const setTotalTime = () => {
    const { hours } = time || 0;
    const { minutes } = time || 0;
    const { seconds } = time || 0;

    const totalTime = parseInt(hours * 3600 + minutes * 60 + seconds);
    setSecondsLeft(totalTime);
  };

  const updateProp = (prop, value) => {
    if (value.length <= 2) {
      setTime({ ...time, [prop]: parseInt(value) });
    }
    if (prop === "hours" && value.length === 2) {
      console.log(prop, inputMinutes.current.focus());
      console.log("Let's move to the next input");
    }
    if (prop === "minutes" && value.length === 2) {
      console.log(prop, inputSeconds.current.focus());
      console.log("Let's move to the next input");
    }
    if (prop === "seconds" && value.length === 2) {
      console.log(prop, inputStart.current.focus());
      console.log("Let's move to the next input");
    }
  };

  return (
    <div className="Timer">
      {timerActive ? (
        <div className="time-left">Time left: {timeLeft(secondsLeft)}</div>
      ) : (
        <div className="inputs">
          <div className="input">
            <input
              value={time.hours}
              placeholder="00h"
              type="number"
              onChange={e => updateProp("hours", e.target.value)}
            />
          </div>
          <div className="input">
            <input
              value={time.minutes}
              ref={inputMinutes}
              placeholder="00m"
              type="number"
              onChange={e => updateProp("minutes", e.target.value)}
            />
          </div>
          <div className="input">
            <input
              value={time.seconds}
              ref={inputSeconds}
              placeholder="00s"
              type="number"
              onChange={e => updateProp("seconds", e.target.value)}
            />
          </div>
        </div>
      )}
      <div className="controllers">
        {timerActive ? (
          <Fragment>
            <button
              type="button"
              className="pause"
              onClick={() => setPause(!pause)}
            >
              {pause ? "Play" : "Stop"}
            </button>
            <button type="button" className="reset" onClick={() => reset()}>
              Reset
            </button>
          </Fragment>
        ) : (
          <button
            type="button"
            ref={inputStart}
            className="start"
            disabled={secondsLeft === 0}
            onClick={() => start()}
          >
            Start
          </button>
        )}
        <button className="sound" onClick={() => setSoundOn(!soundOn)}>
          {soundOn ? (
            <img src={soundOnImg} alt="soundOn" />
          ) : (
            <img src={soundOffImg} alt="soundOff" />
          )}
        </button>
      </div>

      <div className="sound">
        <audio ref={inputSound} src={timerSound}></audio>
      </div>
    </div>
  );
};

export default Timer;
