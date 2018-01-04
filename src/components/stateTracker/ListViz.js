import React from 'react';

import ListItem from './ListItem';
// import '../../variables.css';
import './ListViz.css';

function ListViz({snapshot}) {
  let listVizElements; 

  if (snapshot.get('listValues').size === 0) {
    listVizElements = <div className="ListViz ListViz--empty">Empty</div>
  } else {
    listVizElements = snapshot.get('listValues').map((value, index) => 
      <ListItem value={value} index={index} />
    );
  }

  return <div className="ListViz">{listVizElements}</div>
}

export default ListViz;