import React, {Component} from 'react';
// import Button from './Button';

class Timer extends Component {

  render() {
    const {timerMins, timerSecs, startTimerFlag} = this.props.time;
   
    //if timer has started and hit 0, show msg
    let msg;
    
    msg = (startTimerFlag && timerMins ==='00' && timerSecs === '00') ? 
      <h3 class="timer-msg">Time's up!</h3> : 
      null
    ;

    let timerDisplay = <span>{timerMins}:{timerSecs}</span>;

    return (
      <div>
        <h3>Timer: {timerDisplay}</h3> 
        {msg}
      </div>
    );
  }
}

export default Timer;


