import React from 'react';
import './MethodButton.css';

function MethodButton(props) {
  const classNames = ["MethodButton", `MethodButton--${props.methodName}`];

  if (props.disabled) {
    classNames.push("MethodButton--disabled");
  }
  return (
    <button className={classNames.join(' ')} onClick={props.onClick} disabled={props.disabled}>
      {props.methodName}({props.children})
    </button>
  );
}

export default MethodButton;