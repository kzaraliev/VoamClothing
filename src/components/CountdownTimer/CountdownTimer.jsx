import { useState, useEffect } from 'react';
import './CountdownTimer.css';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Target date: July 10, 2025 at 19:30
  const targetDate = new Date('2025-07-10T19:30:00').getTime();

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({});
      }
    };

    // Calculate initial time
    calculateTimeLeft();
    setIsLoaded(true);

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const formatNumber = (num) => {
    return num.toString().padStart(2, '0');
  };

  return (
    <div className={`countdown-container ${isLoaded ? 'fade-in' : ''}`}>
      <div className="countdown-background">
        <div className="gradient-overlay"></div>
        <div className="particles"></div>
      </div>
      
      <div className="countdown-content">
        <div className="brand-section">
          <h1 className="brand-title">VOAM</h1>
          <div className="brand-subtitle">CLOTHING</div>
        </div>
        
        {Object.keys(timeLeft).length > 0 ? (
          <div className="timer-section">
            <div className="timer-grid">
              <div className="time-unit">
                <div className="time-number">{formatNumber(timeLeft.days)}</div>
                <div className="time-label">days</div>
              </div>
              <div className="time-separator">:</div>
              <div className="time-unit">
                <div className="time-number">{formatNumber(timeLeft.hours)}</div>
                <div className="time-label">hours</div>
              </div>
              <div className="time-separator">:</div>
              <div className="time-unit">
                <div className="time-number">{formatNumber(timeLeft.minutes)}</div>
                <div className="time-label">minutes</div>
              </div>
              <div className="time-separator">:</div>
              <div className="time-unit">
                <div className="time-number">{formatNumber(timeLeft.seconds)}</div>
                <div className="time-label">seconds</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="launch-message">
            <h2>It's Time!</h2>
            <p>The new collection is here</p>
          </div>
        )}
        
        <div className="footer-section">
          <p className="release-date">10.07.2025 • 19:30</p>
          <div className="social-hint">Stay tuned for updates</div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer; 