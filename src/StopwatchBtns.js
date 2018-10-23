import React from 'react';
import Button from './Button';

const StopwatchBtns = (props)=> {

    const {startSW, pauseSW, resetSW, resumeSW} = props;
    const {startedSWFlag, pausedSWFlag} = props.status;

    // //only show resumeBtn if sw has been paused
    // const resumeBtn = pausedSWFlag ? <Button onClick={resumeSW} value="Resume"/>: null;
    const otherBtns = startedSWFlag ? (
        <span>
            <Button onClick={pauseSW} value="Pause"/>
            <Button onClick={resetSW} value="Reset"/>
        </span>
    ): null;

    return (
        <div>
            <Button onClick={startSW} value="Start"/>
            {/* {resumeBtn} */}
            {otherBtns}
        </div>
    );
}

export default StopwatchBtns;