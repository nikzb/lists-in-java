import { List } from 'immutable';

export default function AnimationList({ getAnimationFunction, newSnapshot, prevSnapshot, method, argums }) {
  let animationList = List();

  let timeToFinish = 0;

  if (method === 'get' || method === 'remove') {
    const index = argums[0];

    const returnedValue = newSnapshot.get('command').get('returned');

    // Animation should happen on previous snapshot, not most recent
    const elementToAnimate = prevSnapshot.get('listValues').get(index);

    const elementId = elementToAnimate.get('id');

    const indexAnimation = {
      elementId,
      elementPart: 'index',
      className: 'attention',
      delay: 350,
      duration: 1000
    };

    const valueAnimation = {
      elementId,
      elementPart: 'value',
      className: 'attention',
      delay: 900,
      duration: 1000
    }

    timeToFinish = 1900;

    animationList = animationList.push(getAnimationFunction(indexAnimation));
    animationList = animationList.push(getAnimationFunction(valueAnimation));
  } 
  
  return { timeToFinish, listOfFunctions: animationList };
}


