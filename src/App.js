import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import { Snapshots, addSnapshot, undoSnapshot, currentListSize } from './models/Snapshots';

import MethodToolbox from './components/methodToolbox/MethodToolbox';
import StateTracker from './components/stateTracker/StateTracker';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snapshots: Snapshots(),
      nextValue: 'A'
    }

    this.onMethodButtonClick = this.onMethodButtonClick.bind(this);
  }

  onMethodButtonClick(method, argums) {
    let valueUsed;
    if (method === 'add' || method === 'set') {
      if (argums.length === 1) {
        valueUsed = argums[0];
      } else if (argums.length === 2) {
        valueUsed = argums[1];
      } else {
        throw new Error('Invalid number of arguments: Unsure which argument is the value used');
      }
    }

    console.log(argums);
    console.log(valueUsed);

    if (valueUsed !== undefined) {
      // https://stackoverflow.com/questions/43095621/how-to-increment-letters-in-javascript-to-next-letter
      const i = (parseInt(valueUsed, 36) + 1 ) % 36;
      const nextValue = (!i * 10 + i).toString(36).toUpperCase();

      console.log(nextValue);

      this.setState((prevState, props) => ({ 
        snapshots: addSnapshot(prevState.snapshots, method, argums),
        nextValue 
      }));
    }
    else {
      this.setState((prevState, props) => ({ 
        snapshots: addSnapshot(prevState.snapshots, method, argums) 
      }));
    }
  }

  render() {
    console.log(this.state.snapshots);

    return (
      <div className="App">
        <h1 className="App__header">Lists in Java</h1>
        <div className="App__main-row">
          <StateTracker snapshots={this.state.snapshots} />
          <MethodToolbox 
            onButtonClick={this.onMethodButtonClick} 
            listSize={currentListSize(this.state.snapshots)}
            nextValue={this.state.nextValue}
          />
        </div>

        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
      </div>
    );
  }
}

export default App;
