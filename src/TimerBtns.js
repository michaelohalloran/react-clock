import React from 'react';
import Button from './Button';

const TimerBtns = (props)=> {

    const {changeTimer, startTimer, pauseTimer, resetTimer} = props;
    return (
        <div>
            <Button onClick={changeTimer} value="+Mins">
            </Button>
            <Button onClick={changeTimer} value="-Mins">
            </Button>
            <Button onClick={changeTimer} value="+Secs">
            </Button>
            <Button onClick={changeTimer} value="-Secs">
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