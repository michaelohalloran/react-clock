import React, { Component } from 'react';
import './App.css';
import Clock from './Clock';
import TimerContainer from './TimerContainer';
import StopwatchContainer from './StopwatchContainer';

class App extends Component {

  constructor() {
    super();
    this.state = {
      currentTime: 0,
      loading: true,
      timerMins: '00',
      timerSecs: '00',
      startTimerFlag: false,
      startedSWFlag: false,
      pausedSWFlag: false,
      startingSWBaseTime: 0,
      stopwatchwMs: 0,
      stopwatchSecs: 0,
      stopwatchMins: 0,
      swMsDisplay: '00',
      swSecsDisplay: '00',
      swMinsDisplay: '00',
    }
    this.getTime = this.getTime.bind(this);
    this.changeTimer = this.changeTimer.bind(this);
    this.formatTimerTime = this.formatTimerTime.bind(this);
    this.countdown = this.countdown.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  //setInterval to show current time each second
  componentDidMount() {
    this.timer = setInterval(this.getTime, 1000);
  }

  //clear timer when component unmounts
  componentWillUnmount() {
    clearInterval(this.timer);
  }

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
  formatTimerTime(preTime) {
    return preTime >=0 && preTime <=59 ? preTime < 10 ? `0${preTime}` : preTime : `00`;
  }  

  //Grabs button value and adds or subtracts mins/secs based on value
  changeTimer(e) {
    switch(e.target.value) {
      case '+Mins':
        this.setState((prevState)=> {
          //change timerMins to number before incrementing, format it correctly
          return {timerMins: this.formatTimerTime(+prevState.timerMins+1)}
        });
        break;
      case '-Mins':
        this.setState((prevState)=> {
          return {timerMins: this.formatTimerTime(+prevState.timerMins-1)}
        });
        break;
      case '+Secs':
        this.setState((prevState)=> {
          //if at 59, add to mins also
          if(prevState.timerSecs === '59') {
            return {
              timerMins: this.formatTimerTime(+prevState.timerMins + 1),
              timerSecs: this.formatTimerTime(+prevState.timerSecs+1)
            }
          } else {
            return {timerSecs: this.formatTimerTime(+prevState.timerSecs + 1)}
          } 
        });
        break;
      case '-Secs':
        this.setState((prevState)=> {
          //if e.g. 1:00, allow -Secs to go to 00:59
          if(prevState.timerSecs === '00' && prevState.timerMins !== '00') {
              return {
                timerSecs: '59',
                timerMins: this.formatTimerTime(+prevState.timerMins - 1)
              }
          } else {
              return {timerSecs: this.formatTimerTime(+prevState.timerSecs-1)}
          }
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
            timerSecs: this.formatTimerTime(+prevState.timerSecs - 1),
          }
        } else if (prevState.timerSecs === '00' && prevState.timerMins !== '00') {
          //if timerSecs are at 00 but mins remain, mins go down 1 and secs go down to 59
          return {
            timerMins: this.formatTimerTime(+prevState.timerMins - 1),
            timerSecs: '59'
          }
        }
      });
  }

  startTimer() {
    const {startTimerFlag, timerMins, timerSecs} = this.state;
     //if timer isn't started and timer is at 0, tell them to add time before starting
    if(!startTimerFlag && timerMins === '00' && timerSecs === '00') {
      this.setState({timerMsg: 'You must add time before starting the timer'});
    } else {
      //tell app that timer has been started via a flag, and clear any errorMsg
      this.setState({startTimerFlag: true, timerMsg: ''});
      //Every second, run countdown
      this.decreaseSecs = setInterval(this.countdown,1000);
    } 
  }

  //responds to pause btn press by clearing setInterval
  pauseTimer = ()=> {
    clearInterval(this.decreaseSecs);
  }

  //stops count and resets state values
  resetTimer() {
    this.pauseTimer();
    this.setState({
      timerSecs: '00',
      timerMins: '00',
      startTimerFlag: false,
      timerMsg: ''
    });
  }
//  ************************************************************************************ 
////////////////////////////////////STOPWATCH FUNCTIONS/////////////////////////////////////
//  ************************************************************************************ 

  //startingBaseTime is now (when function runs); stopwatchwMs is either 0 or paused state of stopwatchwMs
  setSWValues =()=> {
    this.setState({
      startingSWBaseTime: (new Date()).getTime() - this.state.stopwatchwMs, //now - 0 or now - paused
      stopwatchwMs: this.state.stopwatchwMs,
      stopwatchSecs: (this.state.stopwatchwMs - (this.state.stopwatchwMs%1000))/1000, //ex: 8547 ms - 547 ms = 8000, then 8000/1000 = 8secs
      stopwatchMins: (this.state.stopwatchSecs - this.state.stopwatchSecs%60)/60 //ex: 127 secs - 7 secs = 120 secs, then 120/60 = 2 mins
    });
  }

  //get starting state values, set up setInterval
  updateRunningSWDisplay = ()=> {
    this.setSWValues();
    this.startSWatch = setInterval(()=> this.setState({
      stopwatchwMs: (new Date()).getTime() - this.state.startingSWBaseTime,
      stopwatchSecs: (this.state.stopwatchwMs - (this.state.stopwatchwMs%1000))/1000,
      stopwatchMins: (this.state.stopwatchSecs - this.state.stopwatchSecs%60)/60,
      swMsDisplay: this.formatMs(this.state.stopwatchwMs),
      swSecsDisplay: this.formatSWTime(this.state.stopwatchSecs),
      swMinsDisplay: this.formatSWTime(this.state.stopwatchMins)
    }), 1);
  }

  handleStartStopwatch = ()=> {
    const {startedSWFlag, pausedSWFlag} = this.state;
    //if not yet started, then set flag to true
    if(!startedSWFlag) {
      this.setState({startedSWFlag: true});
    }
    //if resuming from pause, change paused flag
    else if(pausedSWFlag) {
      this.setState({pausedSWFlag: false});
    }
    this.updateRunningSWDisplay();
  }

  handlePauseStopwatch = ()=> {
    //stop the running SW
    clearInterval(this.startSWatch);
    // clearInterval(this.handleStartStopwatch);
    //change paused flag
    this.setState({
      pausedSWFlag: true, 
    });
  }

  handleResetStopwatch = ()=> {
    //pause the stopwatch
    this.handlePauseStopwatch();
    //reset the display and reset flag to false
    this.setState({
      swMins: '00',
      swSecs: '00',
      swMs: '00',
      stopwatchwMs: 0,
      stopwatchSecs: 0,
      stopwatchMins: 0,
      swMsDisplay: '00',
      swSecsDisplay: '00',
      swMinsDisplay: '00',
      startedSWFlag: false,
      pausedSWFlag: false,
    });
  }

  adjustSWDisplay = stringTime => {
    //make it a string so it can be sliced
    stringTime = stringTime.toString();
    if(+stringTime >= 0 && +stringTime < 10) {
      stringTime = `0${stringTime.slice(0,2)}`;
    } else if(+stringTime >= 10 && +stringTime < 60) {
        stringTime = stringTime.slice(0,2);
      }
      return stringTime.toString();
  }
  
  formatSWTime = time => {
      time = time.toString();
      //if time is 60 secs+ or 60+mins, reset and do the checks from 0
      if(!(+time < 60)) {
        time = this.adjustSWDisplay(time%60);
      } else {
        time = this.adjustSWDisplay(time);
      }
    return time.toString();
  }
  
  formatMs = time => {
    //ms = only last 3 digits
    time%=1000;
    //append two 0's for single digits
    if(time>=0 && time < 10) {
      return `00${time}`;
    }
    //append one 0 for double digits
    else if(time >=10 && time <100) {
      return `0${time}`;
    }
    else {
      return time.toString();
    }
  }

  render() {
    const {
      currentTime, 
      loading, 
      timerMins, 
      timerSecs, 
      startTimerFlag, 
      timerMsg,
      startedSWFlag,
      pausedSWFlag,
      swMsDisplay,
      swSecsDisplay,
      swMinsDisplay
    } = this.state;

    return (
      <div>
        <h1 className="title">React Clock</h1>
        <Clock loading={loading} now={currentTime}/>
        <br />
        <br />
        <TimerContainer 
          time={{timerMins, timerSecs, startTimerFlag, timerMsg}}
          changeTimer={this.changeTimer}
          startTimer={this.startTimer}
          pauseTimer={this.pauseTimer}
          resetTimer={this.resetTimer}
        />
        <br />
        <br />
        <StopwatchContainer 
          stopwatch={{swMsDisplay,swSecsDisplay,swMinsDisplay, startedSWFlag, pausedSWFlag}} 
          handlePauseStopwatch={this.handlePauseStopwatch}
          handleResetStopwatch={this.handleResetStopwatch}
          handleStartStopwatch={this.handleStartStopwatch}
        />
      </div>
    );
  }
}

export default App;
