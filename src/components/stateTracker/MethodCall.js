import React from 'react';

import '../methodToolbox/MethodButton.css';

function MethodCall(props) {
  const classNames = ["MethodButton", `MethodButton--${props.methodName}`];

  return (
    <button 
      className={classNames.join(' ')}>
       {/* onClick={ () => { this.props.onClick(this.state.inputValues) }}  */}
      {props.methodName}({props.arguments.join(',')})
    </button>
  );
}

export default MethodCall;