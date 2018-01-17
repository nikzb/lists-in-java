import React from 'react';
import '../../variables.css';
import './MethodButton.css';

class MethodButton extends React.Component {
  constructor(props) {
    super(props);

    console.log(props);
    console.log(props.children);

    let inputValues = [];
    if (props.children) {
      if (!Array.isArray(props.children)) {
        if (props.inputTypes[0] === 'index') {
          inputValues.push(0);
        } else if (props.inputTypes[0] === 'value') {
          inputValues.push(props.nextValue);
        } else {
          throw new Error('not a valid input type');
        }
      } else {
        for (let index = 0; index < props.children.length; index += 1) {
          if (index % 2 === 0) {
            console.log(props.children[index].type.name);
            if (props.inputTypes[index / 2] === 'index') {
              inputValues.push(0);
            } else if (props.inputTypes[index / 2] === 'value') {
              inputValues.push(props.nextValue);
            } else {
              console.log('Fail', props.inputTypes[index / 2]);
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

  componentWillReceiveProps(nextProps) {
    const newInputValues = [];

    if (nextProps.children) {  
      if (!Array.isArray(nextProps.children)) {
        if (nextProps.inputTypes[0] === 'index') {
          const inputValue = this.state.inputValues[0];
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
        inputIndex: 0
      });
    } else {
      let newChildren = [];

      for (let index = 0; index < props.children.length; index += 1) {
        if (index % 2 === 0) {
          newChildren.push(React.cloneElement(props.children[index], {
            value: this.state.inputValues[index / 2],
            onChange: this.onChange,
            inputIndex: index / 2,
            key: index
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
      <details>
        <summary>
          <button 
            className={classNames.join(' ')} 
            onClick={ () => { this.props.onClick(this.state.inputValues) }} 
            disabled={this.props.disabled}>
            {this.props.methodName}({this.renderChildren(this.props)})
          </button>
        </summary>
        {/* {...descriptions} */}
        <p className="MethodButton__summary--desc1">{this.props.description( ...this.state.inputValues )}</p>
        {desc2}
      </details>
    );
  }
}

export default MethodButton;