import React from 'react';
import Button from './Button';

const StopwatchBtns = (props)=> {

    const {startSW, changeSW} = props;
    
    return (
        <div>
            <Button onClick={changeSW} value="Start">
            </Button>
            <Button onClick={changeSW} value="Stop">
            </Button>
            <Button onClick={changeSW} value="Reset">
            </Button>
        </div>
    );
}

export default StopwatchBtns;