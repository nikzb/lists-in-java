import React from 'react';
import PropTypes from 'prop-types';
import FlipMove from 'react-flip-move';
import nanoid from 'nanoid';
import Immutable from 'immutable';

import ListItem from './ListItem';
import { FlipMoveProps, timeToFinish } from '../../models/FlipMoveProps';
// import '../../variables.css';
import './ListViz.css';

class ListViz extends React.Component {
  render() {
    const snapshot = this.props.snapshot;
    const animationClasses = this.props.animationClasses;
    
    let listVizElements; 
    let numberOfElements = 1;

    if (snapshot.get('listValues').size === 0) {
      listVizElements = <div className="ListViz ListViz--empty">Empty</div>
    } else {
      listVizElements = snapshot.get('listValues').map((valueMap, index) => {
        return (
          <ListItem 
            value={valueMap.get('value')} 
            index={index} 
            animationClasses={animationClasses ? animationClasses.get(valueMap.get('id')) : null}
            id={valueMap.get('id')} 
            key={valueMap.get('id')}
          />
        );
      });
    }

    const flipMoveProps = FlipMoveProps({ duration: 750, delay: 250, staggerDelayBy: 10 });
    const flipMove = this.props.flipMoveProps ? (
      <FlipMove className="ListViz" {...this.props.flipMoveProps.toObject()}>
        {listVizElements}
      </FlipMove>
    ) : (
      <FlipMove className="ListViz">
        {listVizElements}
      </FlipMove>
    );

    // return (
    //   <div className="ListViz">
    //     {listVizElements}
    //   </div>
    // );

    return flipMove;
  }
}

ListViz.defaultProps = {
  isCurrentState: false
};

ListViz.propTypes = {
  snapshot: PropTypes.object,
  isCurrentState: PropTypes.bool
};

export default ListViz;