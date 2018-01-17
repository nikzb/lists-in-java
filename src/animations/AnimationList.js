import { List } from 'immutable';

function longerTimeToFinish(accum, anim) {
  if (anim.delay + anim.duration > accum.delay + accum.duration) {
    return anim;
  } else {
    return accum;
  }
}

function findIndex(listValues, value) {
  return listValues.findIndex(valueMap => {
    return valueMap.get('value') === value;
  });
}

function findLastIndex(listValues, value) {
  return listValues.findLastIndex(valueMap => {
    return valueMap.get('value') === value;
  });
}

function getDelay(index) {
  return 350 + index * 400;
}

export default function AnimationList({ getAnimationFunction, newSnapshot, prevSnapshot, method, argums }) {
  let animationList = List();

  let timeToFinish = 0;
  let index;

  if (method === 'get' || method === 'set' || (method === 'remove' && (typeof argums[0] === 'number'))) {
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
        delay: 350 + index * 300,
        duration: 1000
      }
    ));
  } else if (method === 'contains' || method === 'indexOf' || method === 'lastIndexOf' || 
            (method === 'remove' && (typeof argums[0] === 'string'))) {
    const listValues = prevSnapshot.get('listValues'); 

    if (method === 'lastIndexOf') {
      index = findLastIndex(listValues, argums[0]);
    } else {
      index = findIndex(listValues, argums[0]);

      // If the element is not found, still need to animate the search for it
      let maxIndex;

      if (index === -1) {
        maxIndex = listValues.size - 1;
      } else {
        maxIndex = index - 1;
      }
 
      for (let k = 0; k <= maxIndex; k += 1) {
        animationList = animationList.push({
          elementId: listValues.get(k).get('id'),
          elementPart: 'value',
          className: 'not-it',
          delay: getDelay(k),
          duration: 400
        });
      }
      
      if (index !== -1) {
        const elementToAnimate = listValues.get(index);
        const elementId = elementToAnimate.get('id');

        const valueAnimation = {
          elementId,
          elementPart: 'value',
          className: 'found',
          delay: getDelay(index),
          duration: 1000
        }

        animationList = animationList.push(valueAnimation); 
      }
    }

    if (index !== -1) {
      const elementToAnimate = listValues.get(index);
      const elementId = elementToAnimate.get('id');
      
      if (method === 'indexOf' || method === 'lastIndexOf') {
        const indexAnimation = {
          elementId,
          elementPart: 'index',
          className: 'attention',
          delay: getDelay(index) + 700,
          duration: 1000
        }

        animationList = animationList.push(indexAnimation);
      }
    }
  }

  if (animationList.size > 0) {
    const longestAnimation = animationList.reduce(longerTimeToFinish, animationList.get(0));
    timeToFinish = longestAnimation.delay + longestAnimation.duration;
  }

  
  // Hack to eliminate pause after searching and not finding item for removal
  if (method === 'remove' && (typeof argums[0] === 'string') && index === -1) {
    timeToFinish -= 600;
  }



  return { 
    timeToFinish, 
    listOfFunctions: animationList.map(getAnimationFunction) 
  };
}


