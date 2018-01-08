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
  console.log(`MethodToolbox props.listSize: ${props.listSize}`);
  // Buttons for set, remove, get will be disabled when the list is empty
  const listEmpty = props.listSize === 0;

  return (
    <div className="MethodToolbox">
      <h2 className="section-title">List Methods</h2>
      <MethodButton methodName="add" disabled={props.disabled} nextValue={props.nextValue} onClick={makeOnClickFuncForMethodButton(props.onButtonClick, 'add')}>    
        <ValueInput value={props.nextValue} />
      </MethodButton>
      <MethodButton methodName="add" disabled={props.disabled} nextValue={props.nextValue} onClick={makeOnClickFuncForMethodButton(props.onButtonClick, 'add')}>
        <IndexInput value={0} maxValue={props.listSize}/>, 
        <ValueInput value={props.nextValue} />
      </MethodButton>
      <MethodButton methodName="set" disabled={props.disabled || listEmpty} nextValue={props.nextValue} onClick={makeOnClickFuncForMethodButton(props.onButtonClick, 'set')}>
        <IndexInput value={0} maxValue={props.listSize - 1}/>, 
        <ValueInput value={props.nextValue} />
      </MethodButton>
      <MethodButton methodName="remove" disabled={props.disabled || listEmpty} onClick={makeOnClickFuncForMethodButton(props.onButtonClick, 'remove')}>
        <IndexInput value={0} maxValue={props.listSize - 1}/>
      </MethodButton>
      <MethodButton methodName="get" disabled={props.disabled || listEmpty} onClick={makeOnClickFuncForMethodButton(props.onButtonClick, 'get')}>
        <IndexInput value={0} maxValue={props.listSize - 1}/>
      </MethodButton>
      <MethodButton methodName="size" disabled={props.disabled} onClick={makeOnClickFuncForMethodButton(props.onButtonClick, 'size')}>
      </MethodButton>
    </div>
  );
}

export default MethodToolbox;