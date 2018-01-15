import { List } from 'immutable';

function longerTimeToFinish(accum, anim) {
  if (anim.delay + anim.duration > accum.delay + accum.duration) {
    return anim;
  } else {
    return accum;
  }
}

export default function AnimationList({ getAnimationFunction, newSnapshot, prevSnapshot, method, argums }) {
  let animationList = List();

  let timeToFinish = 0;

  if (method === 'get' || method === 'set' || (method === 'remove' && Number.isInteger(argums[0]))) {
    const index = argums[0];

    // const returnedValue = newSnapshot.get('command').get('returned');

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

    animationList = animationList.push(indexAnimation);
    animationList = animationList.push(valueAnimation);
  } else if (method === 'size') {
    animationList = prevSnapshot.get('listValues').map((listValue, index) => (
      {
        elementId: listValue.get('id'),
        elementPart: 'value',
        className: 'count',
        delay: 350 + index * 50,
        duration: 1000
      }
    ));
  }

  if (animationList.size > 0) {
    const longestAnimation = animationList.reduce(longerTimeToFinish, animationList.get(0));
    timeToFinish = longestAnimation.delay + longestAnimation.duration;
  }

  return { 
    timeToFinish, 
    listOfFunctions: animationList.map(getAnimationFunction) 
  };
}


