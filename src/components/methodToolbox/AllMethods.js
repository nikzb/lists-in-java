import React, { Fragment } from 'react';

import MethodButton from './MethodButton';
import IndexInput from './IndexInput';
import ValueInput from './ValueInput';

function AllMethods({ disabled, listSize, nextValue, lastValueInList, onButtonClick, makeOnClickFuncForMethodButton }) {
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
        methodName="remove" 
        description={(element) => `Remove the first occurrence of the element ${element}, if it occurs in the list.`}
        description2="Returns true if an element was removed, otherwise return false."
        disabled={disabled || listEmpty} 
        nextValue={lastValueInList}
        onClick={makeOnClickFuncForMethodButton(onButtonClick, 'remove')}
      >
        <ValueInput value={lastValueInList} />
      </MethodButton>
      <MethodButton 
        methodName="clear" 
        description={() => `Remove all the elements in the list.`}
        disabled={disabled} 
        onClick={makeOnClickFuncForMethodButton(onButtonClick, 'clear')}>
      </MethodButton>
      <MethodButton 
        methodName="get" 
        description={(index) => `Return a copy of the value at index ${index}.`}
        disabled={disabled || listEmpty} 
        onClick={makeOnClickFuncForMethodButton(onButtonClick, 'get')}>
        <IndexInput value={0} maxValue={Math.max(listSize - 1, 0)}/>
      </MethodButton>
      <MethodButton 
        methodName="contains" 
        description={(element) => `Return true if the element ${element} is present in the list, otherwise return false.`}
        disabled={disabled} 
        nextValue={lastValueInList}
        onClick={makeOnClickFuncForMethodButton(onButtonClick, 'contains')}>
        <ValueInput value={lastValueInList} />
      </MethodButton>
      <MethodButton 
        methodName="indexOf" 
        description={(element) => `Return the index of the first occurrence of the element ${element}.`}
        description2="Return -1 if the element is not found."
        disabled={disabled} 
        nextValue={lastValueInList}
        onClick={makeOnClickFuncForMethodButton(onButtonClick, 'indexOf')}>
        <ValueInput value={lastValueInList} />
      </MethodButton>
      <MethodButton 
        methodName="lastIndexOf" 
        description={(element) => `Return the index of the last occurrence of the element ${element}.`}
        description2="Return -1 if the element is not found."
        disabled={disabled} 
        nextValue={lastValueInList}
        onClick={makeOnClickFuncForMethodButton(onButtonClick, 'lastIndexOf')}>
        <ValueInput value={lastValueInList} />
      </MethodButton>
      <MethodButton 
        methodName="size" 
        description={() => `Return the number of elements in the list.`}
        disabled={disabled} 
        onClick={makeOnClickFuncForMethodButton(onButtonClick, 'size')}>
      </MethodButton>
      <MethodButton 
        methodName="isEmpty" 
        description={() => `Return true if the list contains no elements, otherwise return false.`}
        disabled={disabled} 
        onClick={makeOnClickFuncForMethodButton(onButtonClick, 'isEmpty')}>
      </MethodButton>
    </Fragment>
  );
}

export default AllMethods;