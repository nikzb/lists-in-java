import React from 'react';

import ListHistory from './ListHistory';
import ListViz from './ListViz';
import UndoButton from './UndoButton';

import '../../variables.css';
import './StateTracker.css';

function StateTracker({
      snapshots, 
      onUndo, 
      buttonsDisabled, 
      listVizFlipMoveProps, 
      listHistoryFlipMoveProps,
      animationClasses
  }) {  
  return (
    <div className="StateTracker__wrapper">
      <div className="StateTracker">
        <div className="StateTracker__header">
          <h2 className="section-title">List State</h2>
          <UndoButton onClick={onUndo} disabled={buttonsDisabled || snapshots.size === 1} />
        </div>
        <ListViz 
          snapshot={snapshots.get(snapshots.size - 1)} 
          isCurrentState={true} 
          flipMoveProps={listVizFlipMoveProps}
          animationClasses={animationClasses}
        />
        <ListHistory snapshots={snapshots} flipMoveProps={listHistoryFlipMoveProps} />
      </div>
    </div>
  );
}

export default StateTracker;