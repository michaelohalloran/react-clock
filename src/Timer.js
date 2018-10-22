import React, {Component} from 'react';
// import Button from './Button';

class Timer extends Component {

  render() {
    const {timerMins, timerSecs, startTimerFlag, timerMsg} = this.props.time;
   
    //if timer has started and hit 0, show msg
    let msg;
    // msg = (startTimerFlag && timerMins ==='00' && timerSecs === '00') ? <h3>Time's up!</h3> : timerMsg;
    if(!startTimerFlag && timerMins === '00' && timerSecs === '00') {
      msg = <h3>{timerMsg}</h3>;
    } else if(startTimerFlag && timerMins ==='00' && timerSecs === '00') {
      msg = <h3>Time's up!</h3>;
    }

    let timerDisplay = <div>{timerMins}:{timerSecs}</div>;

    return (
      <div>
        Countdown from:
        {timerDisplay}
        {msg}
      </div>
    );
  }
}

export default Timer;


