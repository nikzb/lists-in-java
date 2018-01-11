import React from 'react';
import { List } from 'immutable';

import '../../variables.css';
import '../../animations/animate.css';
import './ListItem.css';

class ListItem extends React.Component
{
  render() {
    console.log('indexClasses prop ', this.props.indexClasses);

    let indexClasses = [];
    let valueClasses = [];

    if (this.props.indexClasses) {
      const indexClassesArray = this.props.indexClasses.toJS();

      console.log('indexClasse after conversion to JS array ', indexClassesArray);

      indexClasses = ['ListItem__index', 'animated'].concat(this.props.indexClasses.map(
        className => `ListItem__index--${className}`
      ).toJS());

      // indexClasses = ['ListItem__index', 'animated'].concat(this.props.indexClasses.toJS());

      valueClasses = ['ListItem__value', 'animated'].concat(this.props.valueClasses.map(
        className => `ListItem__value--${className}`
      ));

      console.log('indexClasses variable ', indexClasses);
    }
  
    return (
      <div className="ListItem">
        <div className={indexClasses.join(" ")}>{this.props.index}</div>
        <div className={valueClasses.join(" ")}>{this.props.value}</div>
      </div>
    );
  }
}

ListItem.defaultProps = {
  indexClasses: List(),
  valueClasses: List()
};

export default ListItem;