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
  const index = argums[0];

  if (index < 0 || index >= listValues.size) {
    throw new Error(`Invalid Index: Tried to remove value at index ${index} but list only contains ${listValues.size} elements`);
  }

  const removedValue = listValues.get(index);
  const command = Map({ method: 'remove', arguments: argums, returned: removedValue });
  const newListValues = listValues.delete(index);

  return Snapshot(newListValues, command);
}

export function size(prevSnapshot) {
  const listValues = prevSnapshot.get('listValues');
  const command = Map({ method: 'size', arguments: [], returned: listValues.size });
  return Snapshot(listValues, command);
}