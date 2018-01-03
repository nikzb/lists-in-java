import React from 'react';

import ListViz from './ListViz';
import MethodCallAndReturn from './MethodCallAndReturn';

import './ListHistory.css';

function ListHistory({snapshots}) {
  const pastSnapshots = snapshots.pop().reverse();

  console.log(snapshots.get(snapshots.size - 1).get('command'));

  const history = [];

  if (snapshots.size > 1) {
    history.push(<MethodCallAndReturn command={snapshots.get(snapshots.size - 1).get('command')} />);
    for (let index = 0; index < pastSnapshots.size - 1; index += 1) {
      history.push(<ListViz snapshot={pastSnapshots.get(index)} />);
      history.push(<MethodCallAndReturn command={pastSnapshots.get(index).get('command')} />);
    }
  }

  return (
    <div className="ListHistory">
      <div className="ListHistory__header">
        <h2 className="ListHistory__list-vizzes section-title">History</h2>
        <div className="ListHistory__method-call-and-return">
          <h2 className="section-title">Method Call</h2>
          <h2 className="section-title">Returned</h2>
        </div>
      </div>
      {history}
    </div>
  )
}

export default ListHistory;