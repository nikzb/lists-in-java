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
      snapshots: Snapshots()
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
            onButtonClick={
              (method, argums) => { 
                this.setState((prevState, props) => ({ 
                  snapshots: addSnapshot(prevState.snapshots, method, argums) 
                })); 
                console.log('state updated', this.state.snapshots);
              }
            } 
            listSize={currentListSize(this.state.snapshots)}
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
