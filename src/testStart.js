


// testStart() {
//     console.log('hit test start');
//     //every time start is pressed, current is set to whatever was in state (either 0 or
//     //paused time, if you paused it
//     //1st press: current is 0, start is now's stamp - 0 or just now
//     //then we start a setInt every 1ms, 
//     //start never changes, current updates every 1ms to be now - start
//     //because start isn't changing, current (which = now-start) keeps getting larger
//     //start time is right now - current, is set on btnPress and doesn't change
//     //current changes every 1 ms (or however often setInt is called)
//     //ex 1: if we haven't started (i.e., current = 0) then start is now - 0 or just now
//     //ex 2: if we started 5 secs ago (current  = 5), start is now - 5
//     //setInt then 
//     this.setState(
//       // console.log('first current: ', this.state.current),
//       // console.log('first start: ', this.state.start),
//       {
//       current: this.state.current,
//       start: (new Date()).getTime() - this.state.current
//     });
//     this.startTest = setInterval(()=> this.setState({
//       current: (new Date()).getTime() - this.state.start
//     }), 1);
//   }

// //inside return inside the render:
// <div>
//     <button onClick={this.testStart}>Test</button>
//     <h2>{this.state.current}</h2>
// </div>
