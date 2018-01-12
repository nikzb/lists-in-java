import React, { Component } from 'react';

import { Map, List } from 'immutable';
// import logo from './logo.svg';
import './App.css';

import { Snapshots, addSnapshot, undoSnapshot, currentListSize, getMostRecentSnapshot } from './models/Snapshots';
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
      animationClasses: Map()
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

  getAnimationFunction({ elementId, elementPart, className, delay, duration }) { 
    return () => {
      setTimeout(() => {
        let elementMap;
        console.log('animation classes', this.state.animationClasses.toString());
        if (!this.state.animationClasses.has(elementId)) {
          elementMap = Map({ index: List(), value: List() });
          console.log(`New Map since element ID ${elementId} was not found`);
        } else {
          elementMap = this.state.animationClasses.get(elementId);
          console.log(`Found element with id ${elementId}`);
          console.log(elementMap.toString());
        }

        const updatedClassesList = elementMap.get(elementPart).push(className);

        const updatedElementMap = elementMap.set(elementPart, updatedClassesList);

        const updatedAnimationClasses = this.state.animationClasses.set(elementId, updatedElementMap);

        console.log('first set timeout', updatedElementMap.toString());

        this.setState({
          animationClasses: updatedAnimationClasses
        }, () => {
          console.log('done first set timeout');
          setTimeout(() => {
            const elementMap = this.state.animationClasses.get(elementId);
            console.log(`second timout: elementMap with id ${elementId} is ${elementMap}`);
            const classesList = elementMap.get(elementPart);
            const index = classesList.indexOf(className);

            const updatedClassesList = classesList.delete(index);

            const updatedElementMap = elementMap.set(elementPart, updatedClassesList);
            console.log('second set timeout', updatedElementMap.toString());

            const updatedAnimationClasses = this.state.animationClasses.set(elementId, updatedElementMap);

            this.setState({
              animationClasses: updatedAnimationClasses
            });
          }, duration);
        });
      }, delay);
    };
  }

  getAnimationsList(updatedSnapshots, method, argums) {
    let animationsList = List();

    if (method === 'get') {
      const index = argums[0];

      const mostRecentSnapshot = getMostRecentSnapshot(updatedSnapshots);
      const prevSnapshot = getMostRecentSnapshot(this.state.snapshots);

      const returnedValue = mostRecentSnapshot.get('command').get('returned');

      // Animation should happen on previous snapshot, not most recent
      const elementToAnimate = prevSnapshot.get('listValues').get(index);

      const elementId = elementToAnimate.get('id');

      const indexAnimation = {
        elementId,
        elementPart: 'index',
        className: 'attention',
        delay: 350,
        duration: 5000
      };

      const valueAnimation = {
        elementId,
        elementPart: 'value',
        className: 'attention',
        delay: 700,
        duration: 5000
      }

      animationsList = animationsList.push(this.getAnimationFunction(indexAnimation));
      animationsList = animationsList.push(this.getAnimationFunction(valueAnimation));
    }
    
    return animationsList;
  }

  async onMethodButtonClick(method, argums) {
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

    const valueUsed = this.getValueUsed(method, argums);

    let newState = {
      snapshots: updatedSnapshots,
      buttonsDisabled: true,
      listVizFlipMoveProps,
      listHistoryFlipMoveProps
    }

    if (valueUsed !== undefined) {
      newState.nextValue = this.getNextValue(valueUsed);
    }

    const animationsList = this.getAnimationsList(updatedSnapshots, method, argums);

    await this.setState(newState);
    
    animationsList.forEach((animationFunc) => {
      animationFunc();
    });
    

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
