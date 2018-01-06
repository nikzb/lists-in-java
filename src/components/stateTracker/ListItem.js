import React from 'react';

import '../../variables.css';
import './ListItem.css';

class ListItem extends React.Component
{
  render() {
    return (
      <div className="ListItem">
        <div className="ListItem__index">{this.props.index}</div>
        <div className="ListItem__value">{this.props.value}</div>
      </div>
    );
  }
}

export default ListItem;