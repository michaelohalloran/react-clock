import React from 'react';
import Timer from './Timer';
import TimerBtns from './TimerBtns';

const TimerContainer = (props)=> {

    const {timerMins, timerSecs, startTimerFlag} = props.time;
    const {changeTimer, startTimer, pauseTimer, resetTimer} = props;

   return (
        <div>
            <Timer time={{timerMins, timerSecs, startTimerFlag}}/>
            <TimerBtns 
                changeTimer={changeTimer}
                startTimer={startTimer}
                pauseTimer={pauseTimer}
                resetTimer={resetTimer}
            />
        </div>
   );
    
        {/* <Timer time={{timerMins, timerSecs, startTimerFlag}}/>

        <Button onClick={this.changeTimer} value="+Mins">
            Add minutes
        </Button>
        <Button onClick={this.changeTimer} value="-Mins">
            Decrease minutes
        </Button>
        <Button onClick={this.changeTimer} value="+Secs">
            Add seconds
        </Button>
        <Button onClick={this.changeTimer} value="-Secs">
            Decrease seconds
        </Button>
        <Button onClick={this.startTimer}>
            Start Timer
        </Button>
        <Button onClick={this.pauseTimer}>
            Pause Timer
        </Button>
        <Button onClick={this.resetTimer}>
            Reset Timer
        </Button> */}
}

export default TimerContainer;