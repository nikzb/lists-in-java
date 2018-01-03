import React from 'react';

import MethodCall from './MethodCall';
// import ReturnValue from './ReturnValue';

import './ListHistory.css';

function MethodCallAndReturn({command}) {
  console.log(command);
  return (
    <div className="ListHistory__method-call-and-return">
      <MethodCall methodName={command.get('method')} arguments={command.get('arguments')} />
      {/* <ReturnValue value={command.get('returned')} />  */}
    </div>
  );
}

export default MethodCallAndReturn;