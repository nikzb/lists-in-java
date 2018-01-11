import React from 'react';

import ListHistory from './ListHistory';
import ListViz from './ListViz';
import UndoButton from './UndoButton';

import './StateTracker.css';

function StateTracker({
      snapshots, 
      onUndo, 
      buttonsDisabled, 
      listVizFlipMoveProps, 
      listHistoryFlipMoveProps,

      indexAnimationClasses
  }) {
  return (
    <div className="StateTracker">
      <div className="StateTracker__header">
        <h2 className="section-title">List State</h2>
        <UndoButton onClick={onUndo} disabled={buttonsDisabled} />
      </div>
      <ListViz 
        snapshot={snapshots.get(snapshots.size - 1)} 
        isCurrentState={true} 
        flipMoveProps={listVizFlipMoveProps}
        indexAnimationClasses={indexAnimationClasses}
      />
      <ListHistory snapshots={snapshots} flipMoveProps={listHistoryFlipMoveProps} />
    </div>
  );
}

export default StateTracker;