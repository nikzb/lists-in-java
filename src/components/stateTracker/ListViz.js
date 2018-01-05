import React from 'react';

import ListItem from './ListItem';
// import '../../variables.css';
import './ListViz.css';

function ListViz({snapshot}) {
  let listVizElements; 

  if (snapshot.get('listValues').size === 0) {
    listVizElements = <div className="ListViz ListViz--empty">Empty</div>
  } else {
    listVizElements = snapshot.get('listValues').map((valueMap, index) => 
      <ListItem value={valueMap.get('value')} index={index} id={valueMap.get('id')} key={valueMap.get('id')}/>
    );
  }

  return <div className="ListViz">{listVizElements}</div>
}

export default ListViz;