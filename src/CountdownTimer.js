import React, { useState, useEffect, useRef } from 'react';

const CountdownTimer = () => {
  const [duration, setDuration] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }

    return () => clearTimeout(timerRef.current);
  }, [isRunning, timeLeft]);

  const handleStart = () => {
    setTimeLeft(duration);
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(0);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  return (
    <div style={styles.container}>
      <h1>Countdown Timer</h1>
      <div>
        <label>
          Set Timer (seconds):
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            disabled={isRunning}
            style={styles.input}
          />
        </label>
      </div>
      <div>
        <button onClick={handleStart} disabled={isRunning || duration <= 0} style={styles.button}>
          Start
        </button>
        <button onClick={handlePause} disabled={!isRunning} style={styles.button}>
          Pause
        </button>
        <button onClick={handleReset} disabled={isRunning && timeLeft > 0} style={styles.button}>
          Reset
        </button>
      </div>
      <div>
        <h2>
          {timeLeft > 0 ? `Time Left: ${formatTime(timeLeft)}` : "Time's up!"}
        </h2>
      </div>
    </div>
  );
};

// Inline styles for the components
const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
  input: {
    width: '100px',
    padding: '5px',
    fontSize: '16px',
  },
  button: {
    margin: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default CountdownTimer;
