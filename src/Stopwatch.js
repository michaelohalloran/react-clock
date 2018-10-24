import React, {Component} from 'react';

class Stopwatch extends Component {
    render() {
        const {swMsDisplay,swSecsDisplay,swMinsDisplay} = this.props.stopwatch;
        return (
            <div>
                <h3>Stopwatch:</h3>
                {swMinsDisplay}:{swSecsDisplay}:{swMsDisplay}
            </div>
        )
    }
}

export default Stopwatch;