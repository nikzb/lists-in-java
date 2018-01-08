import React from 'react';

import '../../variables.css';
import './UndoButton.css';

function UndoButton({onClick, disabled}) {
  const classNames= ["UndoButton"];

  if (disabled) {
    classNames.push("UndoButton--disabled");
  }

  return <button className={classNames.join(' ')} onClick={onClick} disabled={disabled}>Undo</button>;
}

export default UndoButton;