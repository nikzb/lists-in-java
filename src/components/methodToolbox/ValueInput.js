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
    const oldValue = this.props.value;

    let newValue = this.input.value;

    var startsWithLetter = /^[A-Za-z]/;

    if (newValue.match(startsWithLetter)) {
      if (newValue.length > 1) {
        newValue = newValue.substring(0, 1);
      }

      this.props.onChange(this.props.inputIndex, newValue.toUpperCase());
    } 
  }

  onClick(e) {
    e.stopPropagation();
    e.target.select();
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
        onClick={ this.onClick }
        onSubmit={ (e) => { e.preventDefault(); console.log('in on submit'); }}
      />
    );
  }
}

export default ValueInput;