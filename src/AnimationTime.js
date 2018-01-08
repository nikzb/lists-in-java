

export function getAnimationDuration(method, listSize) {
  const longMethods = ['add', 'set', 'remove'];
  const shortMethods = ['get', 'size'];

  if (longMethods.includes(method)) {
    return 1000;
  } else if (shortMethods.includes(method)) {
    return 500;
  } else {
    throw new Error(`Could not get animation time. Method ${method} not recognized`);
  }
}

export function getVizAnimationDelay(method) {
  const longMethods = ['add', 'set', 'remove'];
  const shortMethods = ['get', 'size'];

  if (longMethods.includes(method)) {
    return 1000;
  } else if (shortMethods.includes(method)) {
    return 100;
  } else {
    throw new Error(`Could not get animation time. Method ${method} not recognized`);
  }
}



