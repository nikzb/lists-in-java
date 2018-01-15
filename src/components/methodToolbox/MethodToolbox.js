import React from 'react';

// import MethodButton from './MethodButton';
// import IndexInput from './IndexInput';
// import ValueInput from './ValueInput';
import APSubsetMethods from './APSubsetMethods';
import AllMethods from './AllMethods';

import './MethodToolbox.css';

function makeOnClickFuncForMethodButton(onClickFromParent, method) {
  return (argums) => {
    onClickFromParent(method, argums);
  };
}

function MethodToolbox(props) {
  // Buttons for set, remove, get will be disabled when the list is empty
  const listEmpty = props.listSize === 0;

  return (
    <div className="MethodToolbox">
      <h2 className="section-title">List Methods</h2>
      {/* <APSubsetMethods 
        disabled={props.disabled}
        listSize={props.listSize}
        nextValue={props.nextValue}
        makeOnClickFuncForMethodButton={makeOnClickFuncForMethodButton}
        onButtonClick={props.onButtonClick}
      /> */}
      <AllMethods 
        disabled={props.disabled}
        listSize={props.listSize}
        nextValue={props.nextValue}
        lastValueInList={props.lastValueInList}
        makeOnClickFuncForMethodButton={makeOnClickFuncForMethodButton}
        onButtonClick={props.onButtonClick}
      />
    </div>
  );
}

export default MethodToolbox;