import React from 'react';

import '../../variables.css';
import './ListItem.css';

function ListItem({value, index, id}) {
  return (
    <div className="ListItem">
      <div className="ListItem__index">{index}</div>
      <div className="ListItem__value">{value}</div>
    </div>
  );
}

export default ListItem;