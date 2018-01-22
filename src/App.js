import React, { Component } from 'react';

import { Map, List } from 'immutable';
import Modal from 'react-modal';

import './variables.css';
import './App.css';

import { Snapshots, addSnapshot, undoSnapshot, currentListSize, getMostRecentSnapshot } from './models/Snapshots';
import { FlipMoveProps, timeToFinish } from './models/FlipMoveProps';
import AnimationList from './animations/AnimationList';
import timeout from './handyScripts/timeout';

import MethodToolbox from './components/methodToolbox/MethodToolbox';
import StateTracker from './components/stateTracker/StateTracker';

Modal.setAppElement('#root');

const customModalStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    background            : 'rgb(22, 133, 230)',
    color                 : 'rgb(240, 240, 240)',
    paddingLeft           : '30px',
    paddingRight          : '30px',
    borderRadius          : '0',
    fontSize              : '0.85em',
    fontFamily            : "'Open Sans', sans-serif",
    fontWeight            : "300",
    maxWidth              : "75vw",
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snapshots: Snapshots(),
      nextValue: 'A',
      buttonsDisabled: false,
      listVizFlipMoveProps: null,
      listHistoryFlipMoveProps: null,
      animationClasses: Map(),
      modalIsOpen: true,
      modalAnimationState: 'entering'
    }

    this.onMethodButtonClick = this.onMethodButtonClick.bind(this);
    this.onUndoButtonClick = this.onUndoButtonClick.bind(this);
    this.enableButtonsAfterWait = this.enableButtonsAfterWait.bind(this);
    this.getAnimationFunction = this.getAnimationFunction.bind(this);
    this.openModal = this.openModal.bind(this);
    // this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }
 
  // afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   this.subtitle.style.color = '#f00';
  // }
 
  async closeModal() {
    this.setState({modalAnimationState: 'exiting'});
    await timeout(1000);
    this.setState({modalIsOpen: false});
  }

  async enableButtonsAfterWait(waitTime, isUndo) {
    await timeout(waitTime);

    // Hack to fix issue with undo flip move issue: delay until undo is completely done, then set state of snapshots one extra time
    if (isUndo) {
      await timeout(300);
    }

    this.setState((prevState, props) => {
      return {
        buttonsDisabled: false,
        snapshots: this.state.snapshots
      }
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
    console.log('on method button click begin');

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
    let listVizFlipMoveDelay = animationList.timeToFinish === 0 ? 250 : 0;
    // let staggerDelayBy = 10;

    if (method === 'set' || method === 'remove' || method === 'add' || method === 'clear') {
      listVizFlipMoveDuration = 1000;
    }

    const listVizFlipMoveProps = FlipMoveProps({ 
      duration: listVizFlipMoveDuration, 
      delay: listVizFlipMoveDelay, 
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
    this.enableButtonsAfterWait(timeToFinish(listHistoryFlipMoveProps, updatedSnapshots.size) * (1 - updatedSnapshots.size / 100), false);
  }

  async onUndoButtonClick() {
    if (this.state.snapshots.size > 1) {
      const mostRecentSnap = getMostRecentSnapshot(this.state.snapshots);
      const updatedSnapshots = undoSnapshot(this.state.snapshots);

      let listVizFlipMoveDuration = 0;
      let listVizFlipMoveDelay = 0;
      let listHistoryFlipMoveDelay = 250;

      const method = mostRecentSnap.get('command').get('method');

      if (method === 'set' || method === 'remove' || method === 'add' || method === 'clear') {
        listVizFlipMoveDuration = 1000;
        listVizFlipMoveDelay = 250;
        listHistoryFlipMoveDelay = 500;
      }
      
      const listVizFlipMoveProps = FlipMoveProps({ 
        duration: listVizFlipMoveDuration, 
        delay: listVizFlipMoveDelay, 
        staggerDelayBy: 10 
      });
      const listHistoryFlipMoveProps = FlipMoveProps({ 
        duration: 800, 
        delay: listHistoryFlipMoveDelay, 
        staggerDelayBy: 50 
      });

      await this.setState({
        snapshots: updatedSnapshots,
        buttonsDisabled: true,
        listVizFlipMoveProps,
        listHistoryFlipMoveProps
      });

      this.enableButtonsAfterWait(timeToFinish(listHistoryFlipMoveProps, updatedSnapshots.size) * (1 - updatedSnapshots.size / 100), true);
    }
  }

  async componentDidMount() {
    await timeout(1500);

    this.setState({
      modalAnimationState: 'showing'
    });
  }

  render() {
    const listSize = currentListSize(this.state.snapshots);
    const mostRecentSnap = getMostRecentSnapshot(this.state.snapshots);

    let lastValueInList;
    if (listSize === 0) {
      lastValueInList = 'A';
    } else {
      lastValueInList = mostRecentSnap.get('listValues').get(listSize - 1).get('value');
    }

    if (this.state.modalAnimationState === 'entering') {
      customModalStyles.content.animation = 'Modal--bounceInDown 1.0s';
    } else if (this.state.modalAnimationState === 'exiting') {
      customModalStyles.content.animation = 'Modal--bounceOutDown 1.5s';
    } else {
      customModalStyles.content.animation = null;
    }
    

    return (
      <div className="App">
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Welcome Modal"
          style={customModalStyles}
        >
          <h1 style={{fontSize: '2.8em', color: "rgb(215, 215, 215)", textShadow: "2px 2px #222"}}>Lists in Java</h1>
          <h2>An interactive tool for exploring the List interface in Java</h2>
          <p style={{fontSize: '1.15em'}}>Use the buttons to call a method, then watch the list to see the result.</p>
          <p style={{fontSize: '1.15em'}}>A history of every method call, return value, and state change is included.</p>
          <button 
            style={{background: "rgb(135, 135, 135)", padding: '0.5em', margin: '0.5em 0 1em 0', fontSize: '1.4em', fontWeight: '300'}} 
            onClick={this.closeModal}>
            Get Started
          </button>
        </Modal>
        <div className="App__header">
          <h1 className="App__title">Lists in Java</h1>
        </div>
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
            lastValueInList={lastValueInList}
            disabled={this.state.buttonsDisabled}
            showAPCheckbox={true}
          />
        </div>
      </div>
    );
  }
}

export default App;
