import React from 'react';

import './UndoButton.css';

function UndoButton({onClick, disabled}) {
  return <button className='UndoButton' onClick={onClick} disabled={disabled}>Undo</button>;
}

export default UndoButton;