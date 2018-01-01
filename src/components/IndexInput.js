import React from 'react';

import "./Input.css";

class IndexInput extends React.Component {
  constructor(props) {
    super(props);
    this.focusInput = this.focusInput.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      value: 0
    }
  }

  focusInput() {
    this.input.focus();
  }

  onChange() {
    const newValue = this.input.value;
    if (newValue >= 0 && newValue <= this.props.maxValue) {
      this.setState({
        value: newValue
      });
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
        value={this.state.value}
        onChange={this.onChange}
        onClick={e => { e.stopPropagation() }}
      />
    );
  }
}

export default IndexInput;