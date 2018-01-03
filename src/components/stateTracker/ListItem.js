import React from 'react';

import './ListItem.css';

function ListItem({value, index}) {
  return (
    <div className="ListItem">
      <div className="ListItem__index">{index}</div>
      <div className="ListItem__value">{value}</div>
    </div>
  );
}

export default ListItem;