import React, {Component} from 'react';
import Stopwatch from './Stopwatch';
import StopwatchBtns from './StopwatchBtns';


class StopwatchContainer extends Component {
    render() {
        const {
            swMsDisplay,
            swSecsDisplay,
            swMinsDisplay,
            startedSWFlag,
            pausedSWFlag
        } = this.props.stopwatch;
        const {handleResetStopwatch, handlePauseStopwatch, handleStartStopwatch} = this.props;

        return (
            <div className="sw-container">
                <Stopwatch stopwatch={{swMsDisplay,swSecsDisplay,swMinsDisplay,startedSWFlag}}/>
                <StopwatchBtns 
                    handleStartStopwatch={handleStartStopwatch}
                    handlePauseStopwatch={handlePauseStopwatch}
                    handleResetStopwatch={handleResetStopwatch}
                    status={{startedSWFlag, pausedSWFlag}}
                />
            </div>
        )
    }
}

export default StopwatchContainer;