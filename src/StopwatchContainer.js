import React, {Component} from 'react';
import Stopwatch from './Stopwatch';
import StopwatchBtns from './StopwatchBtns';


class StopwatchContainer extends Component {
    render() {
        const {swMins, swSecs, swMs, startedSWFlag} = this.props.stopwatch;
        const {resetSW, pauseSW, startSW} = this.props;

        return (
            <div className="sw-container">
                <h3>StopWatch:</h3>
                <Stopwatch stopwatch={{swMins, swSecs, swMs, startedSWFlag}}/>
                <StopwatchBtns 
                    startSW={startSW}
                    pauseSW={pauseSW}
                    resetSW={resetSW}
                />
            </div>
        )
    }
}

export default StopwatchContainer;