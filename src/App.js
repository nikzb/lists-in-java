import React, { Component } from 'react';

import { Map, List } from 'immutable';
// import logo from './logo.svg';
import './App.css';

import { Snapshots, addSnapshot, undoSnapshot, currentListSize, getMostRecentSnapshot } from './models/Snapshots';
import { FlipMoveProps, timeToFinish } from './models/FlipMoveProps';
import AnimationList from './animations/AnimationList';
import timeout from './handyScripts/timeout';

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
      animationClasses: Map()
    }

    this.onMethodButtonClick = this.onMethodButtonClick.bind(this);
    this.onUndoButtonClick = this.onUndoButtonClick.bind(this);
    this.enableButtonsAfterWait = this.enableButtonsAfterWait.bind(this);
    this.getAnimationFunction = this.getAnimationFunction.bind(this);
  }

  async enableButtonsAfterWait(waitTime) {
    await timeout(waitTime);

    this.setState({
      buttonsDisabled: false
    });
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

  getAnimationFunction({ elementId, elementPart, className, delay, duration }) { 
    return async () => {
      await timeout(delay);

      let elementMap;
      
      if (!this.state.animationClasses.has(elementId)) {
        elementMap = Map({ index: List(), value: List() });
      } else {
        elementMap = this.state.animationClasses.get(elementId);
      }

      let updatedClassesList = elementMap.get(elementPart).push(className);
      let updatedElementMap = elementMap.set(elementPart, updatedClassesList);
      let updatedAnimationClasses = this.state.animationClasses.set(elementId, updatedElementMap);

      // console.log(`In animation function `, updatedAnimationClasses.toString());
      await this.setState({
        animationClasses: updatedAnimationClasses
      });
  
      await timeout(duration);

      elementMap = this.state.animationClasses.get(elementId);
      const classesList = elementMap.get(elementPart);
      const index = classesList.indexOf(className);
      updatedClassesList = classesList.delete(index);
      updatedElementMap = elementMap.set(elementPart, updatedClassesList);
      updatedAnimationClasses = this.state.animationClasses.set(elementId, updatedElementMap);

      this.setState({
        animationClasses: updatedAnimationClasses
      });
    };
  }

  async onMethodButtonClick(method, argums) {
    await this.setState({
      buttonsDisabled: true,
    });

    const updatedSnapshots = addSnapshot(this.state.snapshots, method, argums);
    const newSnapshotListSize = currentListSize(updatedSnapshots);

    // const animationsList = this.getAnimationsList(updatedSnapshots, method, argums);
    const animationList = AnimationList({ 
      getAnimationFunction: this.getAnimationFunction,
      newSnapshot: getMostRecentSnapshot(updatedSnapshots),
      prevSnapshot: getMostRecentSnapshot(this.state.snapshots),
      method,
      argums
    });

    animationList.listOfFunctions.forEach((animationFunc) => {
      animationFunc();
    });

    await timeout(animationList.timeToFinish);

    let listVizFlipMoveDuration = 0;

    if (method === 'set' || method === 'remove' || method === 'add') {
      listVizFlipMoveDuration = 1000;
    }

    const listVizFlipMoveProps = FlipMoveProps({ 
      duration: listVizFlipMoveDuration, 
      delay: 0, 
      staggerDelayBy: 10 
    });
    const listHistoryFlipMoveProps = FlipMoveProps({ 
      duration: 800, 
      delay: timeToFinish(listVizFlipMoveProps, newSnapshotListSize), 
      staggerDelayBy: 50 
    });

    const valueUsed = this.getValueUsed(method, argums);

    let newState = {
      snapshots: updatedSnapshots,
      listVizFlipMoveProps,
      listHistoryFlipMoveProps
    }

    if (valueUsed !== undefined) {
      newState.nextValue = this.getNextValue(valueUsed);
    }

    await this.setState(newState);
      
    // Have buttons re-enable after animation is done
    // Delay depends on method used
    this.enableButtonsAfterWait(timeToFinish(listHistoryFlipMoveProps, updatedSnapshots.size) * 0.93);
  }

  onUndoButtonClick() {
    if (this.state.snapshots.size > 1) {
      const updatedSnapshots = undoSnapshot(this.state.snapshots);
      
      const listVizFlipMoveProps = FlipMoveProps({ 
        duration: 1000, 
        delay: 250, 
        staggerDelayBy: 10 
      });
      const listHistoryFlipMoveProps = FlipMoveProps({ 
        duration: 800, 
        delay: 400, 
        staggerDelayBy: 50 
      });

      this.setState((prevState, props) => ({
        snapshots: undoSnapshot(prevState.snapshots),
        buttonsDisabled: true ,
        listVizFlipMoveProps,
        listHistoryFlipMoveProps
      }));

      this.enableButtonsAfterWait(timeToFinish(listHistoryFlipMoveProps, updatedSnapshots.size) * 0.9);
    }
  }

  render() {
    // console.log('rendering app', this.state.animationClasses.toString());

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

            animationClasses={this.state.animationClasses}
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
