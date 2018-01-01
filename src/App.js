import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Snapshots, addSnapshot, undoSnapshot, currentListSize } from './models/Snapshots';

import MethodButton from './components/MethodButton';
import IndexInput from './components/IndexInput';
import ValueInput from './components/ValueInput';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snapshots: Snapshots()
    }
  }

  render() {
    // Buttons for set, remove, get will be disabled when the list is empty
    let disabled = false;
    console.log(currentListSize(this.state.snapshots));
    if (currentListSize(this.state.snapshots) === 0) {
      disabled = true;
    }

    return (
      <div className="App">
        <MethodButton methodName="add" disabled={false} onClick={(argums) => { addSnapshot(this.state.snapshots, 'add', argums) }}>
          <ValueInput value="A" />
        </MethodButton>
        <MethodButton methodName="add" disabled={false} onClick={() => { console.log('add button clicked'); }}>
          <IndexInput value={0} maxValue={3}/>, 
          <ValueInput value="A" />
        </MethodButton>
        <MethodButton methodName="set" disabled={disabled} onClick={() => { console.log('add button clicked'); }}>
          <IndexInput value={0} maxValue={3}/>, 
          <ValueInput value="A" />
        </MethodButton>
        <MethodButton methodName="remove" disabled={disabled} onClick={() => { console.log('add button clicked'); }}>
          <IndexInput value={0} maxValue={3}/>
        </MethodButton>
        <MethodButton methodName="get" disabled={disabled} onClick={() => { console.log('add button clicked'); }}>
          <IndexInput value={0} maxValue={3}/>
        </MethodButton>
        <MethodButton methodName="size" disabled={false} onClick={() => { console.log('add button clicked'); }}>
        </MethodButton>
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
