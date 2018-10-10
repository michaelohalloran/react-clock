import React, {Component} from 'react';
// import Button from './Button';

class Timer extends Component {
  render() {
    return (
      <div>
        Countdown from:
        <div>{this.props.mins}:{this.props.secs}</div>
      </div>
    );
  }
}

export default Timer;


