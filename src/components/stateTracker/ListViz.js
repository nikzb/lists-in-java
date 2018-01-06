import React from 'react';
import FlipMove from 'react-flip-move';
import nanoid from 'nanoid';

import ListItem from './ListItem';
// import '../../variables.css';
import './ListViz.css';

class ListViz extends React.Component {
  render() {
    const snapshot = this.props.snapshot;

    let listVizElements; 

    if (snapshot.get('listValues').size === 0) {
      listVizElements = <div className="ListViz ListViz--empty">Empty</div>
    } else {
      listVizElements = snapshot.get('listValues').map((valueMap, index) => 
        <ListItem value={valueMap.get('value')} index={index} id={valueMap.get('id')} key={valueMap.get('id')}/>
      );
    }

    return (
      // <div className="ListViz">
        <FlipMove className="ListViz" duration={750} delay={200}>
          {listVizElements}
        </FlipMove>
      // </div>
    );
  }
}

export default ListViz;