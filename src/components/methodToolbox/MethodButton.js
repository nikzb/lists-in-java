import React from 'react';
import '../../variables.css';
import './MethodButton.css';

class MethodButton extends React.Component {
  constructor(props) {
    super(props);

    let inputValues = [];
    if (props.children) {
      if (!Array.isArray(props.children)) {
        if (props.children.type.name === 'IndexInput') {
          inputValues.push(0);
        } else if (props.children.type.name === 'ValueInput') {
          inputValues.push('A');
        }
      } else {
        for (let index = 0; index < props.children.length; index += 1) {
          if (index % 2 === 0) {
            if (props.children[index].type.name === 'IndexInput') {
              inputValues.push(0);
            } else if (props.children[index].type.name === 'ValueInput') {
              inputValues.push('A');
            } else {
              throw new Error('Child is not a valid Input type');
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
        if (nextProps.children.type.name === 'IndexInput') {
          const inputValue = this.state.inputValues[0];
          const max = nextProps.children.props.maxValue;
          console.log(`single index input max ${max}`);
          if (inputValue > max) {
            newInputValues.push(max);
          } else {
            newInputValues.push(inputValue);
          }
        } else if (nextProps.children.type.name === 'ValueInput') {
          if (nextProps.nextValue !== undefined) {
            newInputValues.push(nextProps.nextValue);
          } else {
            throw new Error('prop nextValue is undefined. Need nextValue for ValueInput');
          }
        }
      } else {
        for (let index = 0; index < nextProps.children.length; index += 1) {
          if (index % 2 === 0) {
            if (nextProps.children[index].type.name === 'IndexInput') {
              const inputValue = this.state.inputValues[index];
              const max = nextProps.children[index].props.maxValue;
              console.log(`array, index input max: ${max}`);
              if (inputValue > max) {
                newInputValues.push(max);
              } else {
                newInputValues.push(inputValue);
              }
            } else if (nextProps.children[index].type.name === 'ValueInput') {
              if (nextProps.nextValue !== undefined) {
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
    return (
      <button 
        className={classNames.join(' ')} 
        onClick={ () => { this.props.onClick(this.state.inputValues) }} 
        disabled={this.props.disabled}>
        {this.props.methodName}({this.renderChildren(this.props)})
      </button>
    );
  }
}

export default MethodButton;