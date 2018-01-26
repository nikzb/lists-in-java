import React from 'react';
import PropTypes from 'prop-types';

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

    const startsWithLetter = /^[A-Za-z]/;

    if (newValue.match(startsWithLetter)) {
      if (newValue.length > 1) {
        newValue = newValue.substring(0, 1);
      }

      this.props.onChange(this.props.inputIndex, newValue.toUpperCase());
    } 
  }

  onClick(e) {
    e.target.setSelectionRange(0, e.target.value.length);
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
        onKeyDown={
          (e) => {
            if (e.key === 'Backspace') {
              e.preventDefault();
              e.target.setSelectionRange(0, e.target.value.length);
            }
          }
        }
        onKeyPress={ 
          (e) => { 
            // const startsWithLetter = /^[A-Za-z]/;

            // Must get the key pressed correctly depending on browser :(


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

ValueInput.propTypes = {
  inputIndex: PropTypes.number,
  value: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  disabled: PropTypes.bool
};

ValueInput.defaultProps = {
  disabled: false
};

export default ValueInput;