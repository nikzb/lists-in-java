import { Map } from 'immutable';

export function FlipMoveProps({ duration, delay, staggerDelayBy }) {
  return new Map({ duration, delay, staggerDelayBy });
}

export function timeToFinish(flipMovesProps, numElements) {
  return flipMovesProps.get('duration') + flipMovesProps.get('delay') + 
         flipMovesProps.get('staggerDelayBy') * (numElements - 1);
}
