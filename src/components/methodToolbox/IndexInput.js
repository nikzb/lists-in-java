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
    const newValue = parseInt(this.input.value, 10);
    
    if (newValue >= 0 && newValue <= this.props.maxValue) {
      this.props.onChange(this.props.inputIndex, newValue);
      if (newValue === 0) {
        this.input.value = +0;
      }
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
            console.log('keyCode' + e.keyCode);
            console.log('which' + e.which);
            console.log('key' + e.key);
            
            if (e.key === ' ' || e.key === 'Enter') {
              if (!this.props.disabled) {
                this.props.onSubmit();
                this.input.blur();
              }
            }
          }
        }
      />
    );
  }
}

export default IndexInput;