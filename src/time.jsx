import  { useState, useEffect } from 'react';

function Clock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []); 

  const formatTwoDigits = (value) => {
    return value < 10 ? `0${value}` : value;
  };

  return (
    <div className="clock">
      <p>{formatTwoDigits(currentTime.getHours())}:{formatTwoDigits(currentTime.getMinutes())}:{formatTwoDigits(currentTime.getSeconds())}</p>
    </div>
  );
}

export default Clock;
