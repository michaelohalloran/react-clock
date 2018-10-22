import React from 'react';
import Button from './Button';

const StopwatchBtns = (props)=> {

    const {startSW, pauseSW, resetSW} = props;
    
    return (
        <div>
            <Button onClick={startSW} value="Start">
            </Button>
            <Button onClick={pauseSW} value="Stop">
            </Button>
            <Button onClick={resetSW} value="Reset">
            </Button>
        </div>
    );
}

export default StopwatchBtns;