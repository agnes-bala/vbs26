import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const getDefaultTime = (start, end, direction) => {
  const suppliedProps = typeof (start && end) !== 'undefined';
  
      if (suppliedProps && start >= end) {
        return [start, end];
      } return (suppliedProps && start < end) ?
         [start, start]
     :
       [start || 20, end || 0]
};

const handleTime = (time, direction, start, end, multiplier) => {
  const reverseCase = direction === "down";
  if (reverseCase) {
    multiplier =
      end + ((start - end) % multiplier) === time
        ? (start - end) % multiplier
        : multiplier;
    return time - multiplier;
  }
  multiplier =
    end - ((end - start) % multiplier) === time
      ? (end - start) % multiplier
      : multiplier;
  return time + multiplier;
};

const useTimer = ({
  startTime,
  endTime,
  direction = "down",
  multiplier = 2,
  timeOut = 1000
} = {}) => {
  const [start, end] = getDefaultTime(startTime, endTime, direction);
  const [time, setTime] = useState(start);
  const [ticker, setTicker] = useState(null);
  

  useEffect(() => {
    if (!ticker) {
      setTicker(
        setInterval(() => {
          setTime((oldTime) =>
            handleTime(oldTime, direction, start, end, multiplier)
          );
          
        }, timeOut)
      );
    } else if (time === end) {
      clearInterval(ticker);
      setTicker(null);
    }
    // eslint-disable-next-line
  }, [time]);

  return [time, setTime];
};

useTimer.propTypes = {
  startTime: PropTypes.number,
  endTime: PropTypes.number,
  direction: PropTypes.string,
  multiplier: PropTypes.number,
  timeOut: PropTypes.number,
  firsttrigger: PropTypes.string,
};

useTimer.defaultProps = {
  startTime: PropTypes.number,
  endTime: PropTypes.number,
  direction: "up",
  multiplier: 2,
  timeOut: 1000
};

export default useTimer ;
