import React from 'react';
import FlipMove from 'react-flip-move';

import ListViz from './ListViz';
import MethodCallAndReturn from './MethodCallAndReturn';

import './ListHistory.css';

function ListHistory({snapshots, flipMoveProps}) {
  console.log('List History snapshots', snapshots ? snapshots.toString() : null);
  const pastSnapshots = snapshots.pop().reverse();

  console.log('List History past snapshots', pastSnapshots ? pastSnapshots.toString() : null);

  const history = [];
  
  if (snapshots.size > 1) {
    // Use command from most recent snapshot
    const command = snapshots.get(snapshots.size - 1).get('command');

    history.push(<MethodCallAndReturn 
      command={command} 
      key={`MCR${snapshots.get(snapshots.size - 1).get('id')}`} />);
    
    // The pastSnapshots are in reverse order, so start at beginning of List 
    for (let index = 0; index < pastSnapshots.size - 1; index += 1) {      
      if (!pastSnapshots.get(index).get('listValues').equals(pastSnapshots.get(index + 1).get('listValues'))) {
        history.push(<ListViz snapshot={pastSnapshots.get(index)} key={pastSnapshots.get(index).get('id')} />);
      } 
      
      if (index < pastSnapshots.size - 1) { 
        history.push(<MethodCallAndReturn 
          command={pastSnapshots.get(index).get('command')} 
          key={`MCR${pastSnapshots.get(index).get('id')}`} />);
      }
    }

    history.push(
      <ListViz 
        snapshot={pastSnapshots.get(pastSnapshots.size - 1)} 
        key={pastSnapshots.get(pastSnapshots.size - 1).get('id')} 
      />
    );
  }

  console.log(history);

  const flipMove = flipMoveProps ? (
    <FlipMove className="ListHistory__body" {...flipMoveProps.toObject()}>
      {history}
    </FlipMove>
  ) : (
    <FlipMove className="ListHistory__body">
      {history}
    </FlipMove>
  );
  
  return (
    <div className="ListHistory">
      <div className="ListHistory__header">
        <h3 className="ListHistory__list-vizzes section-title">History</h3>
        <h3 className="section-title">Method Call ➔ Return Value</h3>
      </div>
      {flipMove}
    </div>
  )
}

export default ListHistory;