import React from 'react';
import Button from './Button';

const StopwatchBtns = (props)=> {

    const {handleStartStopwatch, handlePauseStopwatch, handleResetStopwatch} = props;
    const {startedSWFlag, pausedSWFlag} = props.status;

    //only show pause if sw has been started and paused
    const pauseBtn = startedSWFlag && !pausedSWFlag? <Button onClick={handlePauseStopwatch} value="Pause"/> : null; 
    //only show reset if sw has been started
    const resetBtn = startedSWFlag ? <Button onClick={handleResetStopwatch} value="Reset"/> : null;
    // const resetBtn = startedSWFlag ? (
    //     <span>
    //         <Button onClick={pauseSW} value="Pause"/>
    //         <Button onClick={resetSW} value="Reset"/>
    //     </span>
    // ): null;

    return (
        <div>
            <Button onClick={handleStartStopwatch} value="Start"/>
            {pauseBtn}
            {resetBtn}
        </div>
    );
}

export default StopwatchBtns;