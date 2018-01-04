import React from 'react';

import './ReturnValue.css';

function ReturnValue({value}) {
  if (value === null) {
    return <div></div>;
  }
  return (
    <div className="ReturnValue__container">➔
      <div className={`ReturnValue ReturnValue--${typeof value}`}>{value}</div>
    </div>
  );
}

export default ReturnValue;