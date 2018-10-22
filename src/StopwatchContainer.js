import React, {Component} from 'react';
import Stopwatch from './Stopwatch';
import StopwatchBtns from './StopwatchBtns';


class StopwatchContainer extends Component {
    render() {
        
        const {changeSW, startSW} = this.props;

        return (
            <div>
                <h3>StopWatch:</h3>
                <Stopwatch />
                <StopwatchBtns 
                    changeSW={changeSW}
                    startSW={startSW}
                />
            </div>
        )
    }
}

export default StopwatchContainer;