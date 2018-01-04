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
      // history.push(
      //   <div className="ListHistory__list-method-return">
      //     <ListViz snapshot={pastSnapshots.get(index)} />
      //     <MethodCallAndReturn command={pastSnapshots.get(index).get('command')} />
      //   </div>
      // );
      history.push(<ListViz snapshot={pastSnapshots.get(index)} />);
      history.push(<MethodCallAndReturn command={pastSnapshots.get(index).get('command')} />);
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