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

  render() {
    return (
      <input className="Input"
        type="number"
        size="1"
        min="0"
        max={ this.props.maxValue }
        ref={(input) => { this.input = input; }} 
        value={this.props.value}
        onChange={this.onChange}
        onClick={e => { e.stopPropagation() }}
      />
    );
  }
}

export default IndexInput;