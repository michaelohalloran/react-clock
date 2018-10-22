import React, {Component} from 'react';
// import Button from './Button';

class Timer extends Component {

  render() {
    let {timerMins, timerSecs, startTimerFlag, timerMsg} = this.props.time;
    // console.log('startTimerFlag in render ', startTimerFlag);
   
    //if timer has started and hit 0, show msg
    let msg;
    // msg = (startTimerFlag && timerMins ==='00' && timerSecs === '00') ? <h3>Time's up!</h3> : timerMsg;
    if(!startTimerFlag && timerMins === '00' && timerSecs === '00') {
      console.log('hit if inside Timer render');
      msg = timerMsg;
    } else if(!startTimerFlag && timerMins ==='00' && timerSecs === '00') {
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


