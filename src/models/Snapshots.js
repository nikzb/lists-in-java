import { List } from 'immutable';
import { Snapshot, add, set, remove, get, size } from './Snapshot';

export function Snapshots() {
  return List([ Snapshot(List(), null) ]);
}

export function addSnapshot(snapshots, method, argums) {
  const mostRecentSnapshot = snapshots.get(snapshots.size - 1);
  let newSnapshot;

  if (method === 'add') {
    newSnapshot = add(mostRecentSnapshot, argums);
  } else if (method === 'set') {
    newSnapshot = set(mostRecentSnapshot, argums);
  } else if (method === 'remove') {
    newSnapshot = remove(mostRecentSnapshot, argums);
  } else if (method === 'get') {
    newSnapshot = get(mostRecentSnapshot, argums);
  } else if (method === 'size') {
    newSnapshot = size(mostRecentSnapshot, []);
  } else {
    throw new Error(`Invalid Method Requested: The method requested was ${method}`);
  }

  return snapshots.push(newSnapshot);
}

export function undoSnapshot(snapshots) {
  if (snapshots.size >= 2) {
    return snapshots.pop();
  } else {
    return snapshots;
  }
}

export function currentListSize(snapshots) {
  const mostRecentSnapshot = snapshots.get(snapshots.size - 1);
  return mostRecentSnapshot.get('listValues').size;
}

