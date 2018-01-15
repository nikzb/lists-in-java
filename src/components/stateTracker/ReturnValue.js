import React from 'react';

import './ReturnValue.css';

function ReturnValue({value, id}) {
  let valueToDisplay;

  if (typeof value === 'boolean') {
    if (value === true) {
      valueToDisplay = 'true';
    } else {
      valueToDisplay = 'false';
    }
  } else {
    valueToDisplay = value;
  }

  if (valueToDisplay === null) {
    return <div></div>;
  }
  return (
    <div className="ReturnValue__container">➔
      <div className={`ReturnValue ReturnValue--${typeof value}`}>{valueToDisplay}</div>
    </div>
  );
}

export default ReturnValue;