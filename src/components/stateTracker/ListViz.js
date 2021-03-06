import React from 'react';
import PropTypes from 'prop-types';
import FlipMove from 'react-flip-move';
import { Map } from 'immutable';

import ListItem from './ListItem';
// import '../../variables.css';
import './ListViz.css';

class ListViz extends React.Component {
  render() {
    const snapshot = this.props.snapshot;
    
    const animationClasses = this.props.animationClasses;
    const flipMoveProps = this.props.flipMoveProps;

    const style = {};
    
    let listVizElements; 

    if (snapshot.get('listValues').size === 0) {
      listVizElements = <div className="ListViz__empty">Empty</div>
    } else {
      const listValues = snapshot.get('listValues');
      const numberOfElements = listValues.size;
      const listItemWidth = 100 / numberOfElements;
      const listItemFontSize = Math.min(1.0, 9 / numberOfElements);

      listVizElements = listValues.map((valueMap, index) => {
        return (
          <ListItem 
            value={valueMap.get('value')} 
            index={index} 
            animationClasses={animationClasses ? animationClasses.get(valueMap.get('id')) : null}
            width={listItemWidth}
            fontSize={listItemFontSize}
            id={valueMap.get('id')} 
            key={valueMap.get('id')}
          />
        );
      });
    }

    // const flipMoveProps = FlipMoveProps({ duration: 750, delay: 250, staggerDelayBy: 10 });
    const flipMove = flipMoveProps ? (
      <FlipMove 
        role="region"
        aria-label="List State" 
        aria-live="polite"
        aria-atomic="true"
        aria-relevant="all"
        className="ListViz" 
        style={style} {...flipMoveProps.toObject()}
      >
        {listVizElements}
      </FlipMove>
    ) : (
      <FlipMove 
        role="region" 
        aria-label="List State" 
        aria-live="polite" 
        aria-atomic="true"
        className="ListViz" 
        aria-relevant="all"
        style={style}
      >
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
  snapshot: PropTypes.instanceOf(Map),
  isCurrentState: PropTypes.bool,
  flipMoveProps: PropTypes.instanceOf(Map),
  animationClasses: PropTypes.object
};

export default ListViz;