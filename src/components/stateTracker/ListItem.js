import React from 'react';
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

      // console.log(`index classes passed in as props`, indexClassesArray);

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

    // console.log(`Index classes: ${indexClasses}`);
    // console.log(`Value classes: ${valueClasses}`);
    const width = this.props.width < 10 ? this.props.width : 10;
    const style = {
      width: `${width * 0.95}%`,
      margin: `${width * 0.05}%`
    }

    return (
      <div style={style} className="ListItem">
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