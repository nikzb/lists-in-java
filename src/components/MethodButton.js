import React from 'react';
import './MethodButton.css';

// function renderChildren(props) {
//   return React.Children.map(props.children, child => {
//     return React.cloneElement(child, {

//     });
//   })
// }
function onClick(children) {
  if (!children) {
    console.log('no children');
  } else { 
    console.log(children);
  }
  // if (children.length === 1) {
  //   console.log(children[0]);
  // } else if (children.length === 3) {
  //   console.log(`Child 1: ${children[0]}`);
  //   console.log(`Child 2: ${children[2]}`);
  // }
}

function MethodButton(props) {
  const classNames = ["MethodButton", `MethodButton--${props.methodName}`];

  if (props.disabled) {
    classNames.push("MethodButton--disabled");
  }
  return (
    <button className={classNames.join(' ')} onClick={onClick(props.children)} disabled={props.disabled}>
      {props.methodName}({props.children})
    </button>
  );
}

export default MethodButton;