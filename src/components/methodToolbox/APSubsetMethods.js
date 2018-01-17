import React, { Fragment } from 'react';

import MethodButton from './MethodButton';
import IndexInput from './IndexInput';
import ValueInput from './ValueInput';

import './MethodButtonsContainer.css';

function APSubsetMethods({ disabled, listSize, nextValue, onButtonClick, makeOnClickFuncForMethodButton }) {
  const listEmpty = listSize === 0;

  return (
    <div className="MethodButtonsContainer">
      <MethodButton 
        methodName="add" 
        description={(element) => `Adds the element ${element} at the end of the list.`}
        disabled={disabled} 
        nextValue={nextValue} 
        onClick={makeOnClickFuncForMethodButton(onButtonClick, 'add')}
      >    
        <ValueInput value={nextValue} />
      </MethodButton>
      <MethodButton 
        methodName="add" 
        description={(index, element) => `At index ${index}, inserts the element ${element}.`}
        disabled={disabled} 
        nextValue={nextValue} 
        onClick={makeOnClickFuncForMethodButton(onButtonClick, 'add')}
      >
        <IndexInput value={0} maxValue={listSize}/>, 
        <ValueInput value={nextValue} />
      </MethodButton>
      <MethodButton 
        methodName="set" 
        description={(index, element) => `Replaces the element at index ${index} with the element ${element}.`}
        description2="Returns the element that was replaced."
        disabled={disabled || listEmpty} 
        nextValue={nextValue} 
        onClick={makeOnClickFuncForMethodButton(onButtonClick, 'set')}
      >
        <IndexInput value={0} maxValue={Math.max(listSize - 1, 0)}/>, 
        <ValueInput value={nextValue} />
      </MethodButton>
      <MethodButton 
        methodName="remove" 
        description={(index) => `Removes the element at index ${index}.`}
        description2="Returns the element that was removed."
        disabled={disabled || listEmpty} 
        onClick={makeOnClickFuncForMethodButton(onButtonClick, 'remove')}
      >
        <IndexInput value={0} maxValue={Math.max(listSize - 1, 0)}/>
      </MethodButton>
      <MethodButton 
        methodName="get" 
        description={(index) => `Returns a copy of the value at index ${index}.`}
        disabled={disabled || listEmpty} 
        onClick={makeOnClickFuncForMethodButton(onButtonClick, 'get')}>
        <IndexInput value={0} maxValue={Math.max(listSize - 1, 0)}/>
      </MethodButton>
      <MethodButton 
        methodName="size" 
        description={() => `Returns the number of elements in the list.`}
        disabled={disabled} 
        onClick={makeOnClickFuncForMethodButton(onButtonClick, 'size')}>
      </MethodButton>
    </div>
  );
}

export default APSubsetMethods;