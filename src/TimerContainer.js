import React from 'react';
import Timer from './Timer';
import TimerBtns from './TimerBtns';

const TimerContainer = (props)=> {

    const {timerMins, timerSecs, startTimerFlag, timerMsg} = props.time;
    const {changeTimer, startTimer, pauseTimer, resetTimer} = props;

   return (
        <div className="timer-container" >
            <Timer time={{timerMins, timerSecs, startTimerFlag, timerMsg}}/>
            <TimerBtns 
                changeTimer={changeTimer}
                startTimer={startTimer}
                pauseTimer={pauseTimer}
                resetTimer={resetTimer}
            />
        </div>
   );
}

export default TimerContainer;