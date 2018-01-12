import React from 'react';
import { List } from 'immutable';

import '../../variables.css';
import '../../animations/animate.css';
import './ListItem.css';

class ListItem extends React.Component
{
  render() {
    // console.log('animationClasses prop ', this.props.animationClasses);

    let indexClasses = [];
    let valueClasses = [];

    if (this.props.animationClasses) {
      // console.log(this.props.animationClasses.get('index'));

      const indexClassesArray = this.props.animationClasses.get('index').toJS();
      const valueClassesArray = this.props.animationClasses.get('value').toJS();

      console.log('indexClasses after conversion to JS array ', indexClassesArray);

      indexClasses = ['ListItem__index', 'animated'].concat(indexClassesArray.map(
        className => `ListItem__index--${className}`
      ));
      valueClasses = ['ListItem__value', 'animated'].concat(valueClassesArray.map(
        className => `ListItem__value--${className}`
      ));

      console.log('valueClasses variable ', valueClasses);
    } else {
      indexClasses = ['ListItem__index'];
      valueClasses = ['ListItem__value'];
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