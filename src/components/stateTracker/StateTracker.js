import React from 'react';

import ListHistory from './ListHistory';
import ListViz from './ListViz';

import './StateTracker.css';

function StateTracker({snapshots}) {
  return (
    <div className="StateTracker">
      <h2 className="section-title">List State</h2>
      <ListViz snapshot={snapshots.get(snapshots.size - 1)} />
       <ListHistory snapshots={snapshots} />
    </div>
  );
}

export default StateTracker;