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
        description={(element) => `Adds the element ${element} at the end of the list.`}
        disabled={disabled} 
        nextValue={nextValue} 
        inputTypes={['value']}
        onClick={makeOnClickFuncForMethodButton(onButtonClick, 'add')}
      >    
        <ValueInput value={nextValue} />
      </MethodButton>
      <MethodButton 
        methodName="add" 
        description={(index, element) => `At index ${index}, inserts the element ${element}.`}
        disabled={disabled} 
        nextValue={nextValue} 
        inputTypes={['index', 'value']}
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
        inputTypes={['index', 'value']}
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
        inputTypes={['index']}
        onClick={makeOnClickFuncForMethodButton(onButtonClick, 'remove')}
      >
        <IndexInput value={0} maxValue={Math.max(listSize - 1, 0)}/>
      </MethodButton>
      <MethodButton 
        methodName="remove" 
        description={(element) => `Removes the first occurrence of the element ${element}, if it occurs in the list.`}
        description2="Returns true if an element was removed, otherwise returns false."
        disabled={disabled || listEmpty} 
        nextValue={lastValueInList}
        inputTypes={['value']}
        onClick={makeOnClickFuncForMethodButton(onButtonClick, 'remove')}
      >
        <ValueInput value={lastValueInList} />
      </MethodButton>
      <MethodButton 
        methodName="clear" 
        description={() => `Removes all the elements in the list.`}
        disabled={disabled} 
        inputTypes={[]}
        onClick={makeOnClickFuncForMethodButton(onButtonClick, 'clear')}>
      </MethodButton>
      <MethodButton 
        methodName="get" 
        description={(index) => `Returns a copy of the value at index ${index}.`}
        disabled={disabled || listEmpty} 
        inputTypes={['index']}
        onClick={makeOnClickFuncForMethodButton(onButtonClick, 'get')}>
        <IndexInput value={0} maxValue={Math.max(listSize - 1, 0)}/>
      </MethodButton>
      <MethodButton 
        methodName="contains" 
        description={(element) => `Returns true if the element ${element} is present in the list, otherwise returns false.`}
        disabled={disabled} 
        nextValue={lastValueInList}
        inputTypes={['value']}
        onClick={makeOnClickFuncForMethodButton(onButtonClick, 'contains')}>
        <ValueInput value={lastValueInList} />
      </MethodButton>
      <MethodButton 
        methodName="indexOf" 
        description={(element) => `Returns the index of the first occurrence of the element ${element}.`}
        description2="Returns -1 if the element is not found."
        disabled={disabled} 
        nextValue={lastValueInList}
        inputTypes={['value']}
        onClick={makeOnClickFuncForMethodButton(onButtonClick, 'indexOf')}>
        <ValueInput value={lastValueInList} />
      </MethodButton>
      <MethodButton 
        methodName="lastIndexOf" 
        description={(element) => `Returns the index of the last occurrence of the element ${element}.`}
        description2="Returns -1 if the element is not found."
        disabled={disabled} 
        nextValue={lastValueInList}
        inputTypes={['value']}
        onClick={makeOnClickFuncForMethodButton(onButtonClick, 'lastIndexOf')}>
        <ValueInput value={lastValueInList} />
      </MethodButton>
      <MethodButton 
        methodName="size" 
        description={() => `Returns the number of elements in the list.`}
        disabled={disabled} 
        inputTypes={[]}
        onClick={makeOnClickFuncForMethodButton(onButtonClick, 'size')}>
      </MethodButton>
      <MethodButton 
        methodName="isEmpty" 
        description={() => `Returns true if the list contains no elements, otherwise return false.`}
        disabled={disabled} 
        inputTypes={[]}
        onClick={makeOnClickFuncForMethodButton(onButtonClick, 'isEmpty')}>
      </MethodButton>
    </Fragment>
  );
}

export default AllMethods;