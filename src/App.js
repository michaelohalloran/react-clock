import React, { Component } from 'react';
import './App.css';
import Clock from './Clock';
import Timer from './Timer';
import TimerContainer from './TimerContainer';
import Button from './Button';
import Stopwatch from './Stopwatch';
import StopwatchContainer from './StopwatchContainer';



class App extends Component {

  constructor() {
    super();
    // let now = new Date().toLocaleTimeString();
    this.state = {
      currentTime: 0,
      loading: true,
      timerMins: '00',
      timerSecs: '00',
      startTimerFlag: false,
      timerMsg: '',
      swMins: '00',
      swSecs: '00',
      swMs: '00',
      startedSWFlag: false,
      pausedSWFlag: false,
      swStart: null,
      swStartTime: null,
      starter: 0,
      currentMs: 0,
      currentSecs: 0,
      currentMins: 0,
      cMsShow: '00',
      cSecShow: '00',
      cMinShow: '00',
    }
    this.getTime = this.getTime.bind(this);
    this.changeTimer = this.changeTimer.bind(this);
    this.formatTime = this.formatTime.bind(this);
    this.countdown = this.countdown.bind(this);
    this.startTimer = this.startTimer.bind(this);
    // this.decreaseSecs = this.decreaseSecs.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.testStart = this.testStart.bind(this);
  }

  //er interval to show time each second
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

  //get currentMs time, change state
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
    // console.log('inside changeTimer : ', e.target.value);
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
          //if e.g. 1:00, allow -Secs to go to 00:59
          if(prevState.timerSecs === '00' && prevState.timerMins !== '00') {
              return {
                timerSecs: '59',
                timerMins: this.formatTime(+prevState.timerMins - 1)
              }
          } else {
              return {timerSecs: this.formatTime(+prevState.timerSecs-1)}
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
    console.log('hit er timer');
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
      startTimerFlag: false,
      timerMsg: ''
    });
  }
//  ************************************************************************************ 
////////////////////////////////////STOPWATCH FUNCTIONS/////////////////////////////////////
//  ************************************************************************************ 

  stopwatchDisplay = ()=> {
    // console.log('hit stopwatch countdown');
    // const {startedSWFlag, swMins, swSecs, swMs} = this.state;
    let {swStart, swStartTime, startedSWFlag, pausedSWFlag} = this.state;
    let currentDate = new Date();
    let currentTimeStamp = currentDate.getTime();
    let ms = currentTimeStamp - swStartTime;
    let msDisplay = this.formatMs(ms);
    let secs = (ms - ms%1000)/1000; //ex: 8547 ms - 547 ms = 8000, then 8000/1000 = 8secs
    let secsDisplay = this.formatSWTime(secs);
    let mins = (secs - secs%60)/60; //ex: 127 secs - 7 secs = 120 secs, then 120/60 = 2 mins
    let minsDisplay = this.formatSWTime(mins);
    this.setState({
      swMins: minsDisplay,
      swSecs: secsDisplay,
      swMs: msDisplay,
      startedSWFlag: true,
    });
    // console.log(`mins: ${minsDisplay} secs: ${secsDisplay} ms: ${msDisplay}`);
  }

  calcSWStart = ()=> {
    this.setState({
      swStart: new Date(),
      swStartTime: (new Date()).getTime()
    });
  }

  //starter is right now; currentMs is either 0 or paused state of currentMs
  setSWValues =()=> {
    // let cMsecs = this.state.currentMs;
    // let cSecs = (cMsecs - cMsecs%1000)/1000;
    // console.log('cMsecs and type: ', +cMsecs, typeof cMsecs);
    // console.log('cSecs and type: ', cSecs, typeof cSecs);
    this.setState({
      starter: (new Date()).getTime() - this.state.currentMs, //now - 0 or now - paused
      currentMs: this.state.currentMs,
      // currentSecs: cSecs,
      currentSecs: (this.state.currentMs - (this.state.currentMs%1000))/1000,
      currentMins: (this.state.currentSecs - this.state.currentSecs%60)/60
    });
  }

  //get starting state values, set up setInterval
  testStart() {
    console.log('hit test start');
    this.setSWValues();
    console.log('initialSWVals: ', this.state.currentMs, this.state.currentSecs);
    console.log('types: ', typeof this.state.currentMs, typeof this.state.currentSecs);
    this.startTest = setInterval(()=> this.setState({
      currentMs: (new Date()).getTime() - this.state.starter,
      currentSecs: (this.state.currentMs - (this.state.currentMs%1000))/1000,
      currentMins: (this.state.currentSecs - this.state.currentSecs%60)/60,
      cMsShow: this.formatMs(this.state.currentMs),
      cSecShow: this.formatSWTime(this.state.currentSecs),
      cMinShow: this.formatSWTime(this.state.currentMins)
    }), 1);
  }

  startSW = ()=> {
    const {startedSWFlag, pausedSWFlag} = this.state;

    //if not yet started, then calculate a starting point
    if(!startedSWFlag) {
      console.log('hit er SW new');
      this.calcSWStart();
      this.testStart();
      this.startStopwatch = setInterval(this.stopwatchDisplay,1);
    }
    //if resuming from pause, use paused timestamp for count
    else if(pausedSWFlag) {
      console.log('resuming from pause, timestamp is', this.state.swStartTime);
      this.testStart();
      this.startStopwatch = setInterval(this.stopwatchDisplay,1);
    }
  }

  pauseSW = ()=> {
    console.log('hit pauseSW');
    //stop the running SW
    clearInterval(this.startTest);
    clearInterval(this.startStopwatch);
    //change paused flag
    this.setState({
      pausedSWFlag: true, 
    });
  }

  resetSW = ()=> {
    console.log('hit resetSW');
    //pause the stopwatch
    this.pauseSW();
    //reset the display and reset flag to false
    this.setState({
      swMins: '00',
      swSecs: '00',
      swMs: '00',
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
      swMins, 
      swSecs, 
      swMs, 
      startedSWFlag,
      pausedSWFlag,
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
          stopwatch={{swMins, swSecs, swMs, startedSWFlag, pausedSWFlag}} 
          pauseSW={this.pauseSW}
          resetSW={this.resetSW}
          startSW={this.startSW}
        />
      </div>
    );
  }
}

export default App;
