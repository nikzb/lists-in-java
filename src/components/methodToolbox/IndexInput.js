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
        onKeyDown={
          (e) => {
            if (e.key === 'Backspace') {
              e.preventDefault();
              e.target.select();
            }
          }
        }
        onKeyPress={ 
          (e) => { 
            const startsWithNumber = /^[0-9]/;
            if (e.key === ' ' || e.key === 'Enter') {
              if (!this.props.disabled) {
                this.props.parentButtonOnClick(this.props.getInputValuesFromParent()); 
              }
            } else if (e.key.match(startsWithNumber)) {
              // const oldValue = e.target.value;
              const newValue = Number.parseInt(e.key, 10);

              console.log(newValue);

              if (newValue <= this.props.maxValue && newValue >= 0) {
                this.onChange();
              }
            }
          }
        }
      />
    );
  }
}

export default IndexInput;