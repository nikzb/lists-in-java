import { List, Map } from 'immutable';
import { Snapshot, add, get, set, remove, size } from './Snapshot';

describe('Snapshot', () => {
  describe('add to list with items', () => {
    let prevSnapshot; 

    beforeEach(() => {
      prevSnapshot = Snapshot(List(['A', 'B', 'C']), Map({ method: '', arguments: [], returned: null }));
    });

    it('should return a new Snapshot with an added item at the end', () => {
      expect(add(prevSnapshot, ['D'])).toEqual(
            Snapshot(List(['A', 'B', 'C', 'D']), Map({ method: 'add', arguments: ['D'], returned: null }))
      );
    });

    it('should return a new Snapshot with an added item at the beginning', () => {
      expect(add(prevSnapshot, [0, 'D'])).toEqual(
            Snapshot(List(['D', 'A', 'B', 'C']), Map({ method: 'add', arguments: [0, 'D'], returned: null }))
      );
    });

    it('should return a new Snapshot with an added item somewhere in the middle', () => {
      expect(add(prevSnapshot, [1, 'D'])).toEqual(
            Snapshot(List(['A', 'D', 'B', 'C']), Map({ method: 'add', arguments: [1, 'D'], returned: null }))
      );
    });
  });

  describe('add to empty list', () => {
    let prevSnapshot; 

    beforeEach(() => {
      prevSnapshot = Snapshot(List([]), null);
    });

    it('should return a new Snapshot with the initial item added', () => {
      expect(add(prevSnapshot, ['D'])).toEqual(
            Snapshot(List(['D']), Map({ method: 'add', arguments: ['D'], returned: null }))
      );
    });

    it('should return a new Snapshot with the initial item added at index 0', () => {
      expect(add(prevSnapshot, [0, 'D'])).toEqual(
            Snapshot(List(['D']), Map({ method: 'add', arguments: [0, 'D'], returned: null }))
      );
    });
  });

  describe('get from list', () => {
    let prevSnapshot; 

    beforeEach(() => {
      prevSnapshot = Snapshot(List(['A', 'B', 'C']), Map({ method: '', arguments: [], returned: null }));
    });

    it('should fetch the correct value from the list and not modify list values', () => {
      const newSnapshot = get(prevSnapshot, [0]);
      expect(newSnapshot.get('command').get('returned')).toEqual('A');
      expect(newSnapshot.get('listValues')).toEqual(prevSnapshot.get('listValues'));
    });
  });

  describe('set value in list', () => {
    let prevSnapshot; 

    beforeEach(() => {
      prevSnapshot = Snapshot(List(['A', 'B', 'C']), Map({ method: '', arguments: [], returned: null }));
    });

    it('should set the value at index to the new value', () => {
      const newSnapshot = set(prevSnapshot, [0, 'D']);
      expect(newSnapshot.get('command').get('returned')).toEqual('A');

      const newListValues = newSnapshot.get('listValues');
      expect(newListValues.size).toBe(prevSnapshot.get('listValues').size);
      expect(newListValues.get(0)).toEqual('D');
    });
  });

  describe('remove value from list', () => {
    let prevSnapshot;

    beforeEach(() => {
      prevSnapshot = Snapshot(List(['A', 'B', 'C']), Map({ method: '', arguments: [], returned: null }));
    });

    it('should remove the value at index', () => {
      const newSnapshot = remove(prevSnapshot, [0]);
      expect(newSnapshot.get('command').get('returned')).toEqual('A');

      const newListValues = newSnapshot.get('listValues');
      expect(newListValues.size).toBe(prevSnapshot.get('listValues').size - 1);
      expect(newListValues.get(0)).toEqual('B');
    });
  });

  describe('get size of list', () => {
    let prevSnapshot; 

    beforeEach(() => {
      prevSnapshot = Snapshot(List(['A', 'B', 'C']), Map({ method: '', arguments: [], returned: null }));
    });

    it('should fetch the correct value from the list and not modify list values', () => {
      const newSnapshot = size(prevSnapshot, []);
      expect(newSnapshot.get('command').get('returned')).toBe(3);
      expect(newSnapshot.get('listValues')).toEqual(prevSnapshot.get('listValues'));
    });
  });
});