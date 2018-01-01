import { Map, List } from 'immutable';

import { Snapshots, addSnapshot, undoSnapshot } from './Snapshots';
import { Snapshot } from './Snapshot';

describe('Snapshots', () => {
  it('should return an immutable List with one snapshot', () => {
    const snapshots = Snapshots();
    expect(snapshots.size).toBe(1);
  });

  it('should add a snapshot to Snapshots', () => {
    const snapshots = Snapshots();
    const newSnapshots = addSnapshot(snapshots, 'add', ['A']);
    expect(newSnapshots.size).toBe(2);
    expect(newSnapshots.get(1)).toEqual(
      Snapshot(List(['A']), Map({ 'method': 'add', 'arguments': ['A'], 'returned': null })) 
    );
  });

  it('should add multiple snapshots to Snapshots', () => {
    let snapshots = Snapshots();
    snapshots = addSnapshot(snapshots, 'add', ['A']);
    snapshots = addSnapshot(snapshots, 'add', ['C']);
    snapshots = addSnapshot(snapshots, 'set', [0, 'B']);
    expect(snapshots.size).toBe(4);
    expect(snapshots.get(3)).toEqual(
      Snapshot(List(['B', 'C']), Map({ 'method': 'set', 'arguments': [0, 'B'], 'returned': 'A' })) 
    );
  });
  
  describe('Remove most recent', () => {
    it('should remove the most recent Snapshot from the List', () => {
      let snapshots = Snapshots();
      snapshots = addSnapshot(snapshots, 'add', ['A']);
      snapshots = addSnapshot(snapshots, 'set', [0, 'B']);
      snapshots = undoSnapshot(snapshots);
      expect(snapshots.size).toBe(2);
      expect(snapshots.get(0)).toEqual(
        Snapshot(List([]), null) 
      );
      expect(snapshots.get(1)).toEqual(
        Snapshot(List(['A']), Map({ 'method': 'add', 'arguments': ['A'], 'returned': null })) 
      );
    });

    it('should not remove the first Snapshot (the one with the empty list)', () => {
      let snapshots = Snapshots();
      snapshots = undoSnapshot(snapshots);
      expect(snapshots.size).toBe(1);
      expect(snapshots.get(0)).toEqual(
        Snapshot(List([]), null) 
      );
    });
  });
});