import React from 'react';

import Checkbox from 'rc-checkbox';
import APSubsetMethods from './APSubsetMethods';
import AllMethods from './AllMethods';

import './MethodToolbox.css';

class MethodToolbox extends React.Component {
  constructor(props) {
    super(props);

    let apOnly = false;

    if (this.props.showAPCheckbox) {
      apOnly = true;
    }

    this.state = {
      apOnly
    }

    this.onCheckboxChange = this.onCheckboxChange.bind(this);
  }

  makeOnClickFuncForMethodButton(onClickFromParent, method) {
    return (argums) => {
      onClickFromParent(method, argums);
    };
  }

  onCheckboxChange(e) {
    if (e.target.checked) {
      this.setState({
        apOnly: true
      });
    } else {
      this.setState({
        apOnly: false
      });
    }
  }

  render() {
    // Buttons for set, remove, get will be disabled when the list is empty
    const listEmpty = this.props.listSize === 0;

    const methods = this.state.apOnly ? (
      <APSubsetMethods 
        disabled={this.props.disabled}
        listSize={this.props.listSize}
        nextValue={this.props.nextValue}
        makeOnClickFuncForMethodButton={this.makeOnClickFuncForMethodButton}
        onButtonClick={this.props.onButtonClick}
      /> ) : ( 
      <AllMethods 
        disabled={this.props.disabled}
        listSize={this.props.listSize}
        nextValue={this.props.nextValue}
        makeOnClickFuncForMethodButton={this.makeOnClickFuncForMethodButton}
        onButtonClick={this.props.onButtonClick}
        lastValueInList={this.props.lastValueInList}
      />
    );

    const apCheckbox = (
      <div className="MethodToolbox__ap-check">
            <Checkbox defaultChecked onChange={this.onCheckboxChange} />
            <label className="MethodToolbox__ap-check--label">
              AP Subset Only
            </label>
        </div>
    );

    return (
      <div className="MethodToolbox">
        <h2 className="section-title">List Methods</h2>
        {this.props.showAPCheckbox ? apCheckbox : null}
        {methods}
      </div>
    );
  }
}

export default MethodToolbox;