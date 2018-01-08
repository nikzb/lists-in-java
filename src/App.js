import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import { Snapshots, addSnapshot, undoSnapshot, currentListSize } from './models/Snapshots';
import { FlipMoveProps, timeToFinish } from './models/FlipMoveProps';

import MethodToolbox from './components/methodToolbox/MethodToolbox';
import StateTracker from './components/stateTracker/StateTracker';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snapshots: Snapshots(),
      nextValue: 'A',
      buttonsDisabled: false,
      listVizFlipMoveProps: null,
      listHistoryFlipMoveProps: null
    }

    this.onMethodButtonClick = this.onMethodButtonClick.bind(this);
    this.onUndoButtonClick = this.onUndoButtonClick.bind(this);
    this.enableButtonsAfterWait = this.enableButtonsAfterWait.bind(this);
  }

  enableButtonsAfterWait(waitTime) {
    setTimeout(() => { 
      this.setState({
        buttonsDisabled: false
      });
    }, waitTime);
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
    
    const updatedSnapshots = addSnapshot(this.state.snapshots, method, argums);
    const newSnapshotListSize = currentListSize(updatedSnapshots);
    const listVizFlipMoveProps = FlipMoveProps({ 
      duration: 1000, 
      delay: 250, 
      staggerDelayBy: 10 
    });
    const listHistoryFlipMoveProps = FlipMoveProps({ 
      duration: 800, 
      delay: timeToFinish(listVizFlipMoveProps, newSnapshotListSize), 
      staggerDelayBy: 50 
    });

    if (valueUsed !== undefined) {
      // https://stackoverflow.com/questions/43095621/how-to-increment-letters-in-javascript-to-next-letter
      const i = (parseInt(valueUsed, 36) + 1 ) % 36;
      const nextValue = (!i * 10 + i).toString(36).toUpperCase();

      this.setState((prevState, props) => ({ 
        snapshots: updatedSnapshots,
        buttonsDisabled: true,
        listVizFlipMoveProps,
        listHistoryFlipMoveProps,
        nextValue 
      }));
    }
    else {
      this.setState((prevState, props) => ({ 
        snapshots: updatedSnapshots,
        buttonsDisabled: true,
        listVizFlipMoveProps,
        listHistoryFlipMoveProps,
      }));
    }

    // Have buttons re-enable after animation is done
    // Delay depends on method used
    this.enableButtonsAfterWait(timeToFinish(listHistoryFlipMoveProps, updatedSnapshots.size));
  }

  onUndoButtonClick() {
    if (this.state.snapshots.size > 1) {
      const updatedSnapshots = undoSnapshot(this.state.snapshots);
      const newSnapshotListSize = currentListSize(updatedSnapshots);
      const listVizFlipMoveProps = FlipMoveProps({ 
        duration: 1000, 
        delay: 250, 
        staggerDelayBy: 10 
      });
      const listHistoryFlipMoveProps = FlipMoveProps({ 
        duration: 800, 
        delay: 250, //timeToFinish(listVizFlipMoveProps, newSnapshotListSize), 
        staggerDelayBy: 50 
      });

      this.setState((prevState, props) => ({
        snapshots: undoSnapshot(prevState.snapshots),
        buttonsDisabled: true ,
        listVizFlipMoveProps,
        listHistoryFlipMoveProps
      }));

      this.enableButtonsAfterWait(timeToFinish(listHistoryFlipMoveProps, updatedSnapshots.size));
    }
  }

  render() {
    return (
      <div className="App">
        <h1 className="App__header">Lists in Java</h1>
        <div className="App__main-row">
          <StateTracker
            snapshots={this.state.snapshots}
            onUndo={this.onUndoButtonClick} 
            buttonsDisabled={this.state.buttonsDisabled}
            listVizFlipMoveProps={this.state.listVizFlipMoveProps}
            listHistoryFlipMoveProps={this.state.listHistoryFlipMoveProps}
          />
          <MethodToolbox 
            onButtonClick={this.onMethodButtonClick} 
            listSize={currentListSize(this.state.snapshots)}
            nextValue={this.state.nextValue}
            disabled={this.state.buttonsDisabled}
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
