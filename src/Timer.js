import React, {Component} from 'react';
// import Button from './Button';

class Timer extends Component {

  render() {
    let {timerMins, timerSecs, startTimerFlag} = this.props.time;
    // console.log('startTimerFlag in render ', startTimerFlag);
   
    //if timer has started and hit 0, show msg
    let msg;
    msg = startTimerFlag && timerMins ==='00' && timerSecs === '00' ? msg = <h3>Time's up!</h3> : null;
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


