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

    expect(newSnapshots.get(1).get('listValues').get(0).get('value')).toEqual('A');
    expect(newSnapshots.get(1).get('command')).toEqual(Map({ 'method': 'add', 'arguments': ['A'], 'returned': null }));
  });

  it('should add multiple snapshots to Snapshots', () => {
    let snapshots = Snapshots();
    snapshots = addSnapshot(snapshots, 'add', ['A']);
    snapshots = addSnapshot(snapshots, 'add', ['C']);
    snapshots = addSnapshot(snapshots, 'set', [0, 'B']);
    expect(snapshots.size).toBe(4);

    const snapshot = snapshots.get(3);

    expect(snapshot.get('listValues').map(item => item.get('value'))).toEqual(List(['B', 'C']));

    const command = snapshot.get('command');

    expect(command.get('method')).toEqual('set');
    expect(command.get('arguments')).toEqual([0, 'B']);
    expect(command.get('returned').get('value')).toEqual('A');
  });
  
  describe('Remove most recent', () => {
    it('should remove the most recent Snapshot from the List', () => {
      let snapshots = Snapshots();
      snapshots = addSnapshot(snapshots, 'add', ['A']);
      snapshots = addSnapshot(snapshots, 'set', [0, 'B']);
      snapshots = undoSnapshot(snapshots);
      expect(snapshots.size).toBe(2);

      const snapshotA = snapshots.get(0);
      expect(snapshotA.get('listValues')).toEqual(List([]));
      expect(snapshotA.get('command')).toBe(null);

      const snapshotB = snapshots.get(1);
      expect(snapshotB.get('listValues').get(0).get('value')).toEqual('A');

      const command = snapshotB.get('command');
      expect(command).toEqual(Map({ 'method': 'add', 'arguments': ['A'], 'returned': null }));
    });

    it('should not remove the first Snapshot (the one with the empty list)', () => {
      let snapshots = Snapshots();
      snapshots = undoSnapshot(snapshots);
      expect(snapshots.size).toBe(1);
      
      const snapshotA = snapshots.get(0);
      expect(snapshotA.get('listValues')).toEqual(List([]));
      expect(snapshotA.get('command')).toBe(null);
    });
  });
});