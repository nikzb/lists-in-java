import React from 'react';

import './UndoButton.css';

function UndoButton({onClick}) {
  return <button className='UndoButton' onClick={onClick}>Undo</button>;
}

export default UndoButton;