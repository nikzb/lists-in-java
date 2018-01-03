import React from 'react';

import ListItem from './ListItem';
import './ListViz.css';

function ListViz({snapshot}) {
  return (
    <div className="ListViz">
      {snapshot.get('listValues').map((value, index) => 
        <ListItem value={value} index={index} />
      )}
    </div>
  );
}

export default ListViz;