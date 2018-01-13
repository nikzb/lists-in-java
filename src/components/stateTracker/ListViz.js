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
    const flipMoveProps = this.props.flipMoveProps;

    if (animationClasses) {
      console.log(`In list viz render`, animationClasses.toString());
    }
    
    let listVizElements; 
    let numberOfElements = 1;

    if (snapshot.get('listValues').size === 0) {
      listVizElements = <div className="ListViz ListViz--empty">Empty</div>
    } else {
      listVizElements = snapshot.get('listValues').map((valueMap, index) => {
        // if (animationClasses) {
        //   const itemAnimationClasses =  animationClasses.get(valueMap.get('id'));
        //   console.log(`searching for animation classes by id ${valueMap.get('id')}`, animationClasses.get(valueMap.get('id')));
        //   if (itemAnimationClasses) {
        //     console.log(`Item animation classes ${itemAnimationClasses.toString()}`);
        //   }
        // }
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

    // const flipMoveProps = FlipMoveProps({ duration: 750, delay: 250, staggerDelayBy: 10 });
    const flipMove = flipMoveProps ? (
      <FlipMove className="ListViz" {...flipMoveProps.toObject()}>
        {listVizElements}
      </FlipMove>
    ) : (
      <FlipMove className="ListViz">
        {listVizElements}
      </FlipMove>
    );

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