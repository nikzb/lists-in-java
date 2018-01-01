import React from 'react';

import "./Input.css";

class ValueInput extends React.Component {
  constructor(props) {
    super(props);
    this.focusInput = this.focusInput.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      value: 'A'
    }
  }

  focusInput() {
    this.input.focus();
  }

  onChange() {
    let newValue = this.input.value;
    console.log(newValue);
    if (newValue.length > 1) {
      newValue = newValue.substring(0, 1);
    }

    this.setState({
      value: newValue
    });
  }

  render() {
    return (
      <input className="Input"
        type="text"
        size="1"
        minLength="1"
        maxLength="1"
        ref={(input) => { this.input = input; }} 
        value={this.state.value}
        onChange={this.onChange}
        onClick={e => { e.stopPropagation() }}
      />
    );
  }
}

export default ValueInput;