import React, {Component} from 'react';
import Stopwatch from './Stopwatch';
import StopwatchBtns from './StopwatchBtns';


class StopwatchContainer extends Component {
    render() {
        const {swMins, swSecs, swMs, startedSWFlag, pausedSWFlag} = this.props.stopwatch;
        const {resetSW, pauseSW, resumeSW, startSW} = this.props;

        return (
            <div className="sw-container">
                <h3>StopWatch:</h3>
                <Stopwatch stopwatch={{swMins, swSecs, swMs, startedSWFlag}}/>
                <StopwatchBtns 
                    startSW={startSW}
                    pauseSW={pauseSW}
                    resetSW={resetSW}
                    resumeSW={resumeSW}
                    status={{startedSWFlag, pausedSWFlag}}
                />
            </div>
        )
    }
}

export default StopwatchContainer;