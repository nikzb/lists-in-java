import React from 'react';

import ListHistory from './ListHistory';
import ListViz from './ListViz';
import UndoButton from './UndoButton';

import './StateTracker.css';

// Epic Fail
// function getHeightStyle(snapshots) {
//   let stateTrackerStyle = {};

//   if (snapshots.size < 10) {
//     stateTrackerStyle.height = '100vh'
//   } 

//   return stateTrackerStyle;
// }

function StateTracker({snapshots, onUndo}) {
  return (
    <div className="StateTracker">
      <div className="StateTracker__header">
        <h2 className="section-title">List State</h2>
        <UndoButton onClick={onUndo} />
      </div>
      <ListViz snapshot={snapshots.get(snapshots.size - 1)} />
       <ListHistory snapshots={snapshots} />
    </div>
  );
}

export default StateTracker;