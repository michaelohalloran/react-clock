import React, {Component} from 'react';
import Button from './Button';

class Stopwatch extends Component {
    render() {
        const {swMins, swSecs, swMs, startedSWFlag} = this.props.stopwatch;
        return (
            <div>
                {swMins}:{swSecs}:{swMs}
            </div>
        )
    }
}

export default Stopwatch;