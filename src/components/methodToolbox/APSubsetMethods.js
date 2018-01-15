import React, { Fragment } from 'react';

import MethodButton from './MethodButton';
import IndexInput from './IndexInput';
import ValueInput from './ValueInput';

function APSubsetMethods({ disabled, listSize, nextValue, onButtonClick, makeOnClickFuncForMethodButton }) {
  const listEmpty = listSize === 0;

  return (
    <Fragment>
      <MethodButton 
        methodName="add" 
        description={(element) => `Add the element ${element} at the end of the list.`}
        disabled={disabled} 
        nextValue={nextValue} 
        onClick={makeOnClickFuncForMethodButton(onButtonClick, 'add')}
      >    
        <ValueInput value={nextValue} />
      </MethodButton>
      <MethodButton 
        methodName="add" 
        description={(index, element) => `At index ${index}, insert the element ${element}.`}
        disabled={disabled} 
        nextValue={nextValue} 
        onClick={makeOnClickFuncForMethodButton(onButtonClick, 'add')}
      >
        <IndexInput value={0} maxValue={listSize}/>, 
        <ValueInput value={nextValue} />
      </MethodButton>
      <MethodButton 
        methodName="set" 
        description={(index, element) => `Replace the element at index ${index} with the element ${element}.`}
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
        description={(index) => `Remove the element at index ${index}.`}
        description2="Returns the element that was removed."
        disabled={disabled || listEmpty} 
        onClick={makeOnClickFuncForMethodButton(onButtonClick, 'remove')}
      >
        <IndexInput value={0} maxValue={Math.max(listSize - 1, 0)}/>
      </MethodButton>
      <MethodButton 
        methodName="get" 
        description={(index) => `Return a copy of the value at index ${index}.`}
        disabled={disabled || listEmpty} 
        onClick={makeOnClickFuncForMethodButton(onButtonClick, 'get')}>
        <IndexInput value={0} maxValue={Math.max(listSize - 1, 0)}/>
      </MethodButton>
      <MethodButton 
        methodName="size" 
        description={() => `Return the number of elements in the list.`}
        disabled={disabled} 
        onClick={makeOnClickFuncForMethodButton(onButtonClick, 'size')}>
      </MethodButton>
    </Fragment>
  );
}

export default APSubsetMethods;