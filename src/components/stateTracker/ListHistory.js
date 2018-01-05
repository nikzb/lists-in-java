import React from 'react';

import ListViz from './ListViz';
import MethodCallAndReturn from './MethodCallAndReturn';

import './ListHistory.css';

function ListHistory({snapshots}) {
  const pastSnapshots = snapshots.pop().reverse();

  const history = [];

  if (snapshots.size > 1) {
    // Use command from most recent snapshot
    history.push(<MethodCallAndReturn 
      command={snapshots.get(snapshots.size - 1).get('command')} 
      key={`${snapshots.get(snapshots.size - 1).get('id')}MCR`} />);
    
    // The pastSnapshots are in reverse order, so start at beginning of List 
    for (let index = 0; index < pastSnapshots.size; index += 1) {
      // history.push(
      //   <div className="ListHistory__list-method-return">
      //     <ListViz snapshot={pastSnapshots.get(index)} />
      //     <MethodCallAndReturn command={pastSnapshots.get(index).get('command')} />
      //   </div>
      // );
      if (index === 0) {
        if (!pastSnapshots.get(0).get('listValues').equals(snapshots.get(snapshots.size - 1).get('listValues'))) {
          history.push(<ListViz snapshot={pastSnapshots.get(0)} key={pastSnapshots.get(0).get('id')} />);
        }
      } else if (!pastSnapshots.get(index).get('listValues').equals(pastSnapshots.get(index - 1).get('listValues'))) {
          history.push(<ListViz snapshot={pastSnapshots.get(index)} key={pastSnapshots.get(index).get('id')} />);
      }

      if (index < pastSnapshots.size - 1) { 
        history.push(<MethodCallAndReturn 
          command={pastSnapshots.get(index).get('command')} 
          key={`${pastSnapshots.get(index).get('id')}MCR`} />);
      }
    }
  }

  return (
    <div className="ListHistory">
      <div className="ListHistory__header">
        <h3 className="ListHistory__list-vizzes section-title">History</h3>
        {/* <div className="ListHistory__method-call-and-return"> */}
        <h3 className="section-title">Method Call ➔ Return Value</h3>
          {/* <h3 className="section-title">Method Call</h3> */}
          {/* <h3 className="section-title">Returned</h3> */}
        {/* </div> */}
      </div>
      <div className="ListHistory__body">
        {history}
      </div>
    </div>
  )
}

export default ListHistory;