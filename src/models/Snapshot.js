import { Map, List } from 'immutable';
import nanoid from 'nanoid';

export function Snapshot(listValues, command) {
  if (!List.isList(listValues)) {
    throw new Error('Snapshot parameter listValues must be of type immutable List');
  }
  //return Map({ 'listValues': listValues, 'command': command });
  return Map({ listValues, command, id: nanoid() });
}

function getValueMap(value) {
  return Map({ value, id: nanoid() });
}

export function add(prevSnapshot, argums) {
  const listValues = prevSnapshot.get('listValues');
  let newListValues;

  if (argums.length === 1) {
    newListValues = listValues.push(getValueMap(argums[0]));
  } else if (argums.length === 2) {
    const index = argums[0];
    if (index < 0 || index > listValues.size) {
      throw new Error(`Cannot add at index greater than size of list: Tried to add at index ${index} when size is ${listValues.size}`);
    }
    newListValues = listValues.insert(argums[0], getValueMap(argums[1]));
  } else {
    throw new Error(`Invalid Number of Arguments: Tried to call add with ${argums.length} arguments`);
  }

  // const command = Map({ 'method': 'add', 'arguments': argums, 'returned': null });
  const command = Map({ method: 'add', arguments: argums, returned: null });

  return Snapshot(newListValues, command);
}

export function get(prevSnapshot, argums) {
  const listValues = prevSnapshot.get('listValues');
  const index = argums[0];

  if (index < 0 || index >= listValues.size) {
    throw new Error(`Invalid Index: Tried to get value at index ${index} but list only contains ${listValues.size} elements`);
  }

  const command = Map({ method: 'get', arguments: argums, returned: listValues.get(index)});
  return Snapshot(listValues, command);
}

export function set(prevSnapshot, argums) {
  const listValues = prevSnapshot.get('listValues');
  const index = argums[0];

  if (index < 0 || index >= listValues.size) {
    throw new Error(`Invalid Index: Tried to set value at index ${index} but list only contains ${listValues.size} elements`);
  }

  const newValue = argums[1];

  const valueToReplace = listValues.get(index);
  const command = Map({ method: 'set', arguments: argums, returned: valueToReplace });
  const newListValues = listValues.set(index, getValueMap(newValue));

  return Snapshot(newListValues, command);
}

export function remove(prevSnapshot, argums) {
  const listValues = prevSnapshot.get('listValues');

  const argum = argums[0];

  // Need to determine if argument is a value or index
  if (typeof argum === 'number') {
    const index = argum;

    if (index < 0 || index >= listValues.size) {
      throw new Error(`Invalid Index: Tried to remove value at index ${index} but list only contains ${listValues.size} elements`);
    }

    const removedValue = listValues.get(index);
    const command = Map({ method: 'remove', arguments: argums, returned: removedValue });
    const newListValues = listValues.delete(index);

    return Snapshot(newListValues, command);
  } else {
    const regexp = /^[A-Z]/;
    if (regexp.test(argum)) {
      const index = findIndex(listValues, argum);

      if (index === -1) {
        const command = Map({ method: 'remove', arguments: argums, returned: false });
        return Snapshot(listValues, command);
      }

      const newListValues = listValues.delete(index);
      const command = Map({ method: 'remove', arguments: argums, returned: true });
      return Snapshot(newListValues, command);
    } else {
      throw new Error('Invalid argument passed to remove');
    }
  }
}

export function size(prevSnapshot) {
  const listValues = prevSnapshot.get('listValues');
  const command = Map({ method: 'size', arguments: [], returned: listValues.size });
  return Snapshot(listValues, command);
}

export function clear(prevSnapshot) {
  const listValues = prevSnapshot.get('listValues');
  const command = Map({ method: 'clear', arguments: [], returned: null });
  return Snapshot(listValues.clear(), command);
}

function findIndex(listValues, value) {
  return listValues.findIndex(valueMap => {
    return valueMap.get('value') === value;
  });
}

export function contains(prevSnapshot, argums) {
  const listValues = prevSnapshot.get('listValues');
  const valueToFind = argums[0];

  const found = findIndex(listValues, valueToFind) !== -1;

  const command = Map({ method: 'contains', arguments: argums, returned: found });

  return Snapshot(listValues, command);
}

export function indexOf(prevSnapshot, argums) {
  const listValues = prevSnapshot.get('listValues');
  const valueToFind = argums[0];

  const index = findIndex(listValues, valueToFind);

  const command = Map({ method: 'indexOf', arguments: argums, returned: index });

  return Snapshot(listValues, command);
}

export function lastIndexOf(prevSnapshot, argums) {
  const listValues = prevSnapshot.get('listValues');
  const valueToFind = argums[0];

  const index = listValues.findLastIndex(valueMap => valueMap.get('value') === valueToFind);

  const command = Map({ method: 'lastIndexOf', arguments: argums, returned: index });

  return Snapshot(listValues, command);
}

export function isEmpty(prevSnapshot) {
  const listValues = prevSnapshot.get('listValues');

  const command = Map({ method: 'isEmpty', arguments: [], returned: listValues.size === 0 });

  return Snapshot(listValues, command);
}