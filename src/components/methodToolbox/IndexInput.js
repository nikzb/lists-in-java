import React from 'react';

import "./Input.css";

class IndexInput extends React.Component {
  constructor(props) {
    super(props);
    this.focusInput = this.focusInput.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  focusInput() {
    this.input.focus();
  }

  onChange() {
    const newValue = Number.parseInt(this.input.value, 10);
    if (newValue >= 0 && newValue <= this.props.maxValue) {
      this.props.onChange(this.props.inputIndex, newValue);
    }
  }

  onClick(e) {
    e.target.select();
  }

  render() {
    return (
      <input className="Input Input--index"
        type="number"
        size="1"
        min="0"
        max={ this.props.maxValue }
        ref={(input) => { this.input = input; }} 
        value={this.props.value}
        onChange={this.onChange}
        onClick={this.onClick}
        onKeyPress={ 
          (e) => {  
            if (e.key === ' ' || e.key === 'Enter') {
              if (!this.props.disabled) {
                this.props.parentButtonOnClick(this.props.getInputValuesFromParent()); 
              }
            }
          }
        }
      />
    );
  }
}

export default IndexInput;