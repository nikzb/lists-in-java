import React from 'react';
import { Map } from 'immutable';

import MethodCall from './MethodCall';
import ReturnValue from './ReturnValue';

import './MethodCallAndReturn.css';

function MethodCallAndReturn({command}) {
  const returnValueToCheck = command.get('returned');
  let valueToUse;
  let id = null;
  if (returnValueToCheck === null) {
    valueToUse = null;
  } else if (Map.isMap(returnValueToCheck)) {
    valueToUse = returnValueToCheck.get('value');
    id = returnValueToCheck.get('id');
  } else if (Number.isInteger(returnValueToCheck)) {
    valueToUse = returnValueToCheck;
  }

  return (
    <div className="MethodCallAndReturn">
      <MethodCall methodName={command.get('method')} arguments={command.get('arguments')} />
      <ReturnValue value={valueToUse} id={id} /> 
    </div>
  );
}

export default MethodCallAndReturn;