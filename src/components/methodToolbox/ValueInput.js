import React from 'react';

import "./Input.css";

class ValueInput extends React.Component {
  constructor(props) {
    super(props);
    this.focusInput = this.focusInput.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  focusInput() {
    this.input.focus();
  }

  onChange() {
    let newValue = this.input.value;

    if (newValue.length > 1) {
      newValue = newValue.substring(0, 1);
    }

    this.props.onChange(this.props.inputIndex, newValue);
  }

  render() {
    return (
      <input className="Input Input--value"
        type="text"
        size="1"
        minLength="1"
        maxLength="1"
        ref={(input) => { this.input = input; }} 
        value={this.props.value}
        onChange={this.onChange}
        onClick={e => { e.stopPropagation() }}
      />
    );
  }
}

export default ValueInput;