import React from 'react';
import PropTypes from 'prop-types';

import '../../variables.css';
import './MethodButton.css';

class MethodButton extends React.Component {
  constructor(props) {
    super(props);

    // Initialize an array of input values for the initial state
    // index inputs get 0 by default
    // value inputs get nextValue prop
    let inputValues = [];
    if (props.children) {
      // If props.children is not an array, there is only one input child
      if (!Array.isArray(props.children)) {
        if (props.inputTypes[0] === 'index') {
          inputValues.push(0);
        } else if (props.inputTypes[0] === 'value') {
          inputValues.push(props.nextValue);
        } else {
          throw new Error('not a valid input type');
        }
      } else {
        // Must go through all input children
        // Use only even numbered index values in props.children because of commas
        for (let index = 0; index < props.children.length; index += 1) {
          if (index % 2 === 0) {
            if (props.inputTypes[index / 2] === 'index') {
              inputValues.push(0);
            } else if (props.inputTypes[index / 2] === 'value') {
              inputValues.push(props.nextValue);
            } else {
              throw new Error('not a valid input type');
            }
          }
        }
      }
    }

    this.state = {
      inputValues
    };

    this.onChange = this.onChange.bind(this);
  }

  // When props are received, must validate and update the input values
  componentWillReceiveProps(nextProps) {
    const newInputValues = [];

    if (nextProps.children) {  
      if (!Array.isArray(nextProps.children)) {
        // Only one child input
        if (nextProps.inputTypes[0] === 'index') {
          const inputValue = this.state.inputValues[0];
        
          // Max value was passed to index inputs in MethodToolbox render (via AllMethods or APSubsetMethods)
          const max = nextProps.children.props.maxValue;
          
          if (inputValue > max) {
            newInputValues.push(max);
          } else {
            newInputValues.push(inputValue);
          }
        } else if (nextProps.inputTypes[0] === 'value') {
          if (nextProps.nextValue) {
            newInputValues.push(nextProps.nextValue);
          } else {
            throw new Error('prop nextValue is undefined. Need nextValue for ValueInput');
          }
        }
      } else {
        for (let index = 0; index < nextProps.children.length; index += 1) {
          if (index % 2 === 0) {
            if (nextProps.inputTypes[index / 2] === 'index') {
              const inputValue = this.state.inputValues[index];
              const max = nextProps.children[index].props.maxValue;
              
              if (inputValue > max) {
                newInputValues.push(max);
              } else {
                newInputValues.push(inputValue);
              }
            } else if (nextProps.inputTypes[index / 2] === 'value') {
              if (nextProps.nextValue) {
                newInputValues.push(nextProps.nextValue);
              } else {
                throw new Error('prop nextValue is undefined. Need nextValue for ValueInput');
              }
            } else {
              throw new Error('Child is not a valid Input type');
            }
          }
        }
      }

      this.setState({
        inputValues: newInputValues
      });
    }
  }

  onChange(index, newValue) {
    this.setState((prevState, props) => ({
      inputValues: prevState.inputValues.map((value, currentIndex) => {
        if (index === currentIndex) {
          return newValue;
        }
        return value;
      })
    }));
  }

  renderChildren(props) {
    if (!props.children) {
      return;
    } else if (!Array.isArray(props.children)) {
      return React.cloneElement(props.children, {
        value: this.state.inputValues[0],
        onChange: this.onChange,
        inputIndex: 0,
        onSubmit: () => { this.props.onClick(this.state.inputValues) },
        disabled: this.props.disabled
      });
    } else {
      let newChildren = [];

      for (let index = 0; index < props.children.length; index += 1) {
        if (index % 2 === 0) {
          newChildren.push(React.cloneElement(props.children[index], {
            value: this.state.inputValues[index / 2],
            onChange: this.onChange,
            inputIndex: index / 2,
            key: index,
            onSubmit: () => { this.props.onClick(this.state.inputValues) },
            disabled: this.props.disabled
          }));
        } else {
          newChildren.push(props.children[index]);
        }
      }

      return newChildren;
    }
  }

  render() {
    const classNames = ["MethodButton", `MethodButton--${this.props.methodName}`];

    if (this.props.disabled) {
      classNames.push("MethodButton--disabled");
    }

    // const descriptions = [<p>{this.props.description(...this.state.inputValues)}</p>];
    // if (this.props.description2) {
    //   descriptions.push(<p>{this.props.description2}</p>);
    // }
    const desc2 = this.props.description2 ? <p className="MethodButton__summary--desc2">{this.props.description2}</p> : null;

    return (
      <details className="MethodButton__details">
        <summary 
          className="MethodButton__summary" 
          onClick={ (e) => { 
            if (e.target.className !== "MethodButton__summary") {
              e.preventDefault();
            }
          }}
          onKeyUp={ (e) => {
            if ((e.key === ' ') && e.target.className !== "MethodButton__summary") {
              e.preventDefault();
            }
          }}
          >
          <div 
            className={classNames.join(' ')} 
            onClick={ (e) => {
              if (!this.props.disabled) {
                if (e.target.className.indexOf('MethodButton') !== -1) {
                  this.props.onClick(this.state.inputValues) 
                } else if (e.target.type === 'text' || e.target.type === 'number') {
                  
                } else {
                  throw new Error('Could not determine which part of this button was clicked');
                }
              }
            }} 
            tabIndex={0}
            onKeyPress={ (e) => {
              if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                if (!this.props.disabled) {
                  if (e.target.className.indexOf('MethodButton') !== -1) {
                    this.props.onClick(this.state.inputValues) 
                  } else if (e.target.type === 'text' || e.target.type === 'number') {
                    
                  } else {
                    throw new Error('Could not determine which part of this button was clicked');
                  }
                }
              }
            }}
            disabled={this.props.disabled}>
            
            {this.props.methodName}({this.renderChildren(this.props)})
          </div>
        </summary>
        <p className="MethodButton__summary--desc1">{this.props.description( ...this.state.inputValues )}</p>
        {desc2}
      </details>
    );
  }
}

MethodButton.propTypes = {
  methodName: PropTypes.string.isRequired,
  inputTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  disabled: PropTypes.bool,
  description: PropTypes.func.isRequired,
  nextValue: PropTypes.string,
  onClick: PropTypes.func.isRequired
};

export default MethodButton;