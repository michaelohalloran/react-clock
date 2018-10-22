import React, {Component} from 'react';

class Clock extends Component {
  render() {
    const {loading, now} = this.props;
    let timeDisplay;

  //if still loading, show msg; otherwise show time
    loading ? timeDisplay = 'Loading' : timeDisplay = now;

  // if(loading) {
  //   timeDisplay = <h4>Loading</h4>
  // } else {
  //   timeDisplay = 
  // }

    return (
      <div className="clock">
        <h3>Current time: {timeDisplay}</h3>
      </div>
    );
  }
}

export default Clock;