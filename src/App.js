import React, { Component } from 'react';
import './App.css';
import Clock from './Clock';
import Timer from './Timer';
import TimerContainer from './TimerContainer';
import Button from './Button';
import Stopwatch from './Stopwatch';



class App extends Component {

  constructor() {
    super();
    // let now = new Date().toLocaleTimeString();
    this.state = {
      currentTime: 0,
      loading: true,
      timerMins: '00',
      timerSecs: '00',
      startTimerFlag: false
    }
    this.getTime = this.getTime.bind(this);
    this.changeTimer = this.changeTimer.bind(this);
    this.formatTime = this.formatTime.bind(this);
    this.countdown = this.countdown.bind(this);
    this.startTimer = this.startTimer.bind(this);
    // this.decreaseSecs = this.decreaseSecs.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
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
    return preTime >=0 && preTime <=59 ? preTime < 10 ? `0${preTime}` : preTime : `00`;
  }

  //Grabs button value and adds or subtracts mins/secs based on value
  changeTimer(e) {
    console.log('inside changeTimer : ', e.target.value);
    // e.target.value == '+Mins' ? this.setState({timerMins: 3}) : console.log('null');
    switch(e.target.value) {
      case '+Mins':
        this.setState((prevState)=> {
          //change timerMins to number before incrementing, format it correctly
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
          //if at 59, add to mins also
          if(prevState.timerSecs === '59') {
            // console.log(`At secs 59, state is ${typeof prevState.timerSecs}`);
            return {
              timerMins: this.formatTime(+prevState.timerMins + 1),
              timerSecs: this.formatTime(+prevState.timerSecs+1)
            }
          } else {
            return {timerSecs: this.formatTime(+prevState.timerSecs + 1)}
          } 
        });
        break;
      case '-Secs':
        this.setState((prevState)=> {
          return {timerSecs: this.formatTime(+prevState.timerSecs-1)}
        });
        break;
      default:
          console.log('unknown category');
          return;
    } 
  }

  

  countdown =()=> {
    this.setState(prevState=> {
        //if secs aren't at 0, decrement them
        if(prevState.timerSecs !== '00') {
          return {
            timerSecs: this.formatTime(+prevState.timerSecs - 1),
          }
        } else if (prevState.timerSecs === '00' && prevState.timerMins !== '00') {
          //if timerSecs are at 00 but mins remain, mins go down 1 and secs go down to 59
          return {
            timerMins: this.formatTime(+prevState.timerMins - 1),
            timerSecs: '59'
          }
        }
      });
  }


  startTimer() {
    console.log('hit start timer');
    //tell app that timer has been started via a flag
    this.setState({startTimerFlag: true});
    //Every second, run countdown
    this.decreaseSecs = setInterval(this.countdown,1000);
  }


  //clears the setInterval
  stopCountdown = ()=> {
    clearInterval(this.decreaseSecs);
  }


  //responds to pause btn press
  pauseTimer = ()=> {
    console.log('hit pause');
    this.stopCountdown();
  }

  //stops count and resets state values
  resetTimer() {
    console.log('hit reset');
    this.stopCountdown();
    this.setState({
      timerSecs: '00',
      timerMins: '00',
      startTimerFlag: false
    });
  }

  render() {
    const {currentTime, loading, timerMins, timerSecs, startTimerFlag} = this.state;

    return (
      <div>
        <h1 className="title">React Clock</h1>
        <Clock loading={loading} now={currentTime}/>
        <TimerContainer 
          time={{timerMins, timerSecs, startTimerFlag}}
          changeTimer={this.changeTimer}
          startTimer={this.startTimer}
          pauseTimer={this.pauseTimer}
          resetTimer={this.resetTimer}
        />
        <br />

        {/* <Timer time={{timerMins, timerSecs, startTimerFlag}}/> */}

        {/* <Button onClick={this.changeTimer} value="+Mins">
            Add minutes
        </Button>
        <Button onClick={this.changeTimer} value="-Mins">
            Decrease minutes
        </Button>
        <Button onClick={this.changeTimer} value="+Secs">
            Add seconds
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
        </Button> */}
        <br />
        <br />
        <Stopwatch />
      </div>
    );
  }
}

export default App;
