import React, { Component } from 'react';

import { Map, List } from 'immutable';
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
      listHistoryFlipMoveProps: null,
      animationClasses: Map({ index: List() })
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

  getValueUsed(method, argums) {
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
    return valueUsed;
  }

  getNextValue(valueUsed) {
     // https://stackoverflow.com/questions/43095621/how-to-increment-letters-in-javascript-to-next-letter
     const i = (parseInt(valueUsed, 36) + 1 ) % 36;
     return (!i * 10 + i).toString(36).toUpperCase();
  }

  initiateAnimation({ animationName, element, delay, duration }) {
    setTimeout(() => {
      const updatedClasses = this.state.animationClasses.get(element).push(animationName);
      const updatedAnimationClasses = this.state.animationClasses.set(element, updatedClasses);
      this.setState({
        animationClasses: updatedAnimationClasses
      }, () => {
        setTimeout(() => {
          const index = this.state.animationClasses.get(element).indexOf(animationName);
          const updatedClasses = this.state.animationClasses.get(element).delete(index);
          const updatedAnimationClasses = this.state.animationClasses.set(element, updatedClasses);
          this.setState({
            animationClasses: updatedAnimationClasses
          });
        }, duration);
      });
    }, delay);
  }

  onMethodButtonClick(method, argums) {
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

    // const animations = [];
    let indexAnimation;

    if (method === 'get') {
      // animations.push({
      indexAnimation = {
        animationName: 'attention',
        element: 'index',
        delay: 350,
        duration: 1000
      };

      this.initiateAnimation(indexAnimation);
    }

    const valueUsed = this.getValueUsed(method, argums);

    if (valueUsed !== undefined) {
      const nextValue = this.getNextValue(valueUsed);

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
        delay: timeToFinish(listVizFlipMoveProps, newSnapshotListSize), 
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

            indexAnimationClasses={this.state.animationClasses.get('index')}
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
