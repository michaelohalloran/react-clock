import React, { Component } from 'react';
import './App.css';
import Clock from './Clock';
import Timer from './Timer';
import Button from './Button';


class App extends Component {

  constructor() {
    super();
    // let now = new Date().toLocaleTimeString();
    this.state = {
      currentTime: 0,
      loading: true,
      timerMins: '00',
      timerSecs: '00'
    }
    this.getTime = this.getTime.bind(this);
    this.changeTimer = this.changeTimer.bind(this);
    this.formatTime = this.formatTime.bind(this);
    this.countdown = this.countdown.bind(this);
    this.startTimer = this.startTimer.bind(this);
    // this.decreaseTime = this.decreaseTime.bind(this);
    this.clearTimer = this.clearTimer.bind(this);
  }

  //start interval to show time each second
  componentDidMount() {
    // this.setState({
    //   loading: false
    // });
    this.timer = setInterval(this.getTime, 1000);
  }

  //clear timer when component unmounts
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  //get current time, change state
  //change loading to false once time is obtained
  getTime() {
    const time = new Date().toLocaleTimeString();
    this.setState({
      currentTime: time,
      loading: false
    });
  }

  //take in a time 0 or more, format with leading 0's
  //disallows negative time by sticking at 00 if decrementing from 00
  formatTime(preTime) {
    return preTime >=0 ? preTime < 10 ? `0${preTime}` : preTime : `00`;
  }

  changeTimer(e) {
    // console.log(e.target.value);
    // e.target.value == '+Mins' ? this.setState({timerMins: 3}) : console.log('null');
    switch(e.target.value) {
      case '+Mins':
        this.setState((prevState)=> {
          return {timerMins: this.formatTime(+prevState.timerMins+1)}
        });
        // console.log(e.target.value);
        break;
      case '-Mins':
        this.setState((prevState)=> {
          return {timerMins: this.formatTime(+prevState.timerMins-1)}
        });
        break;
      case '+Secs':
        this.setState((prevState)=> {
          return {timerSecs: this.formatTime(+prevState.timerSecs+1)}
        });
        break;
      case '-Secs':
        this.setState((prevState)=> {
          return {timerSecs: this.formatTime(+prevState.timerSecs-1)}
        });
        break;
      default:
          console.log('unknown category');
    } 
  }

  countdown =()=> {
    //decrement timerSecs
    this.setState(prevState=> {
        console.log(prevState.timerSecs);
        return {timerSecs: this.formatTime(+prevState.timerSecs - 1)}
      });
    // console.log('countdown this', this);
  }

  startTimer() {
    console.log('hit start timer');
    // console.log('startTimer this ', this);
    //take current time and start decrementing seconds every 1 second
    //also decrement minutes every 60 seconds
    // this.decreaseTime = setInterval(this.countdown,1000);
    // return this.state.timerSecs > 0 ? this.decreaseTime : console.log('done'); 
    // clearInterval(this.decreaseTime);
    // console.log(this.state.timerSecs);
    console.log(typeof this.state.timerSecs);
    this.decreaseTime = setInterval(this.countdown,1000);
    console.log(this.decreaseTime);
    // return this.state.timerSecs === '00' ? this.clearTimer() : this.decreaseTime = setInterval(this.countdown,1000);
  }

  
  clearTimer() {
    clearInterval(this.decreaseTime);
  }

  pauseTimer() {
    console.log('hit pause');
  }

  resetTimer() {
    console.log('hit reset');
  }
  

  render() {
    // let timeDisplay;
    const {currentTime, loading, timerMins, timerSecs} = this.state;

    // this.state.loading ? timeDisplay = <div>'Load'</div> : timeDisplay = this.state.currentTime;

    return (
      <div>
        <h1 className="title">React Clock</h1>
        <Clock loading={loading} now={currentTime}/>
        <Timer mins={timerMins} secs={timerSecs}/>

        <Button onClick={this.changeTimer} value="+Mins">
            Add minutes
        </Button>
        <Button onClick={this.changeTimer} value="-Mins">
            Decrease minutes
        </Button>
        <Button onClick={this.changeTimer} value="+Secs">
            Increase seconds
        </Button>
        <Button onClick={this.changeTimer} value="-Secs">
            Decrease seconds
        </Button>
        <Button onClick={this.startTimer}>
            Start Timer
        </Button>
        <Button onClick={this.pauseTimer}>
            Pause Timer
        </Button>
        <Button onClick={this.resetTimer}>
            Reset Timer
        </Button>
      </div>
    );
  }
}

export default App;
