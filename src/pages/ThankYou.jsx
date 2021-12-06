import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Redirect } from "react-router";


const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <Redirect to="/" />;
    }
  
    return (
      <div className="timer">
        <div className="text">Redirecting in</div>
        <div className="value">{remainingTime}</div>
        <div className="text">seconds</div>
      </div>
    );
  };
function ThankYou() {
  return (
    <div>
      <Header />
      <div style={{ minHeight: "50vh", margin: "120px auto", alignItems:"center" }}>
          <h2 style={{textAlign:"center", color:"gray"}}>Thank You For Shopping With Us</h2>
          <div className="timer-wrapper">
        <CountdownCircleTimer
          isPlaying
          duration={10}
          colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
          onComplete={() => [true, 1000]}
        >
          {renderTime}
        </CountdownCircleTimer>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ThankYou;
