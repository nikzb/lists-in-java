import React from 'react';

import '../methodToolbox/MethodButton.css';

function MethodCall(props) {
  const classNames = ["MethodCall", "MethodButton", `MethodButton--${props.methodName}`];

  return (
    <div 
      className={classNames.join(' ')}>
       {/* onClick={ () => { this.props.onClick(this.state.inputValues) }}  */}
      {props.methodName}({props.arguments.join(',')})
    </div>
  );
}

export default MethodCall;