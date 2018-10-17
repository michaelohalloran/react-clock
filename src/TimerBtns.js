import React from 'react';
import Button from './Button';

const TimerBtns = (props)=> {

    const {changeTimer, startTimer, pauseTimer, resetTimer} = props;
    return (
        <div>
            <Button onClick={changeTimer} value="+Mins">
                Add minutes
            </Button>
            <Button onClick={changeTimer} value="-Mins">
                Decrease minutes
            </Button>
            <Button onClick={changeTimer} value="+Secs">
                Add seconds
            </Button>
            <Button onClick={changeTimer} value="-Secs">
                Decrease seconds
            </Button>
            <Button onClick={startTimer}>
                Start Timer
            </Button>
            <Button onClick={pauseTimer}>
                Pause Timer
            </Button>
            <Button onClick={resetTimer}>
                Reset Timer
            </Button>
        </div>
    );
}

export default TimerBtns;