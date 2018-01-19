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
        <label className="MethodToolbox__ap-check--label">
          <Checkbox id="ap-check" defaultChecked onChange={this.onCheckboxChange} />
          <span className="ap-check--actual-label">AP Subset Only</span>
        </label>
      </div>
    );

    return (
      <div className="MethodToolbox__wrapper">
        <div className="MethodToolbox">
          <h2 className="section-title">List Methods</h2>
          {this.props.showAPCheckbox ? apCheckbox : null}
          <div className={"MethodToolbox__buttons-container"}>
            {methods}
          </div>
        </div>
      </div>
    );
  }
}

export default MethodToolbox;