import React from 'react';

import MethodButton from './MethodButton';
import IndexInput from './IndexInput';
import ValueInput from './ValueInput';

import './MethodToolbox.css';

function makeOnClickFuncForMethodButton(onClickFromParent, method) {
  return (argums) => {
    onClickFromParent(method, argums);
  };
}

function MethodToolbox(props) {
  // Buttons for set, remove, get will be disabled when the list is empty
  let disabled = false;
  
  if (props.listSize === 0) {
    disabled = true;
  }

  return (
    <div className="MethodToolbox">
      <h2 className="section-title">List Methods</h2>
      <MethodButton methodName="add" disabled={false} onClick={makeOnClickFuncForMethodButton(props.onButtonClick, 'add')}>    
        <ValueInput value="A" />
      </MethodButton>
      <MethodButton methodName="add" disabled={false} onClick={makeOnClickFuncForMethodButton(props.onButtonClick, 'add')}>
        <IndexInput value={0} maxValue={props.listSize}/>, 
        <ValueInput value="A" />
      </MethodButton>
      <MethodButton methodName="set" disabled={disabled} onClick={makeOnClickFuncForMethodButton(props.onButtonClick, 'set')}>
        <IndexInput value={0} maxValue={props.listSize - 1}/>, 
        <ValueInput value="A" />
      </MethodButton>
      <MethodButton methodName="remove" disabled={disabled} onClick={makeOnClickFuncForMethodButton(props.onButtonClick, 'remove')}>
        <IndexInput value={0} maxValue={props.listSize - 1}/>
      </MethodButton>
      <MethodButton methodName="get" disabled={disabled} onClick={makeOnClickFuncForMethodButton(props.onButtonClick, 'get')}>
        <IndexInput value={0} maxValue={props.listSize - 1}/>
      </MethodButton>
      <MethodButton methodName="size" disabled={false} onClick={makeOnClickFuncForMethodButton(props.onButtonClick, 'size')}>
      </MethodButton>
    </div>
  );
}

export default MethodToolbox;