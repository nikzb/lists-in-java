import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import '../../variables.css';
import '../../animations/animate.css';
import './ListItem.css';

class ListItem extends React.Component
{
  render() {
    let indexClasses = [];
    let valueClasses = [];

    if (this.props.animationClasses) {
      const indexClassesArray = this.props.animationClasses.get('index').toJS();
      const valueClassesArray = this.props.animationClasses.get('value').toJS();

      indexClasses = ['ListItem__index', 'animated'].concat(indexClassesArray.map(
        className => `ListItem__index--${className}`
      ));
      valueClasses = ['ListItem__value', 'animated'].concat(valueClassesArray.map(
        className => `ListItem__value--${className}`
      ));
    } else {
      indexClasses = ['ListItem__index'];
      valueClasses = ['ListItem__value'];
    }

    const width = this.props.width < 10 ? this.props.width : 10;
    const style = {
      fontSize: `${this.props.fontSize*100}%`,
      width: `${width * 0.92}%`,
      marginLeft: `${width * 0.08}%`,
      marginRight: `${width * 0.08}%`
    }

    return (
      <div style={style} className="ListItem">
        <div className={indexClasses.join(" ")}>{this.props.index}</div>
        <div className={valueClasses.join(" ")}>{this.props.value}</div>
      </div>
    );
  }
}

ListItem.propTypes = {
  width: PropTypes.number,
  fontSize: PropTypes.number,
  index: PropTypes.number,
  value: PropTypes.string,
  animationClasses: PropTypes.object
};

ListItem.defaultProps = {
  animationClasses: List()
};

export default ListItem;