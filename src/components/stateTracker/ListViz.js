import React from 'react';
import PropTypes from 'prop-types';
import FlipMove from 'react-flip-move';

import ListItem from './ListItem';
// import '../../variables.css';
import './ListViz.css';

class ListViz extends React.Component {
  render() {
    const snapshot = this.props.snapshot;
    const animationClasses = this.props.animationClasses;
    const flipMoveProps = this.props.flipMoveProps;

    // if (animationClasses) {
    //   console.log(`In list viz render`, animationClasses.toString());
    // }

    const style = {};
    
    let listVizElements; 

    if (snapshot.get('listValues').size === 0) {
      listVizElements = <div className="ListViz ListViz--empty">Empty</div>
    } else {
      const listValues = snapshot.get('listValues');
      const numberOfElements = listValues.size;
      const width = 100 / numberOfElements;
      const fontSize = Math.min(1.0, 8 / numberOfElements);

      style.fontSize = `${fontSize}em`;

      listVizElements = listValues.map((valueMap, index) => {
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
            width={width}
            id={valueMap.get('id')} 
            key={valueMap.get('id')}
          />
        );
      });
    }

    // const flipMoveProps = FlipMoveProps({ duration: 750, delay: 250, staggerDelayBy: 10 });
    const flipMove = flipMoveProps ? (
      <FlipMove className="ListViz" style={style} {...flipMoveProps.toObject()}>
        {listVizElements}
      </FlipMove>
    ) : (
      <FlipMove className="ListViz" style={style}>
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