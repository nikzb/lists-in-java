import { List, Map } from 'immutable';
import { Snapshot, add, get, set, remove, size } from './Snapshot';

describe('Snapshot', () => {
  describe('add to list with items', () => {
    let prevSnapshot; 

    beforeEach(() => {
      prevSnapshot = Snapshot(List([
        Map({ value: 'A', id: 'A1' }),
        Map({ value: 'B', id: 'B1' }),
        Map({ value: 'C', id: 'C1' })
      ]), Map({ method: '', arguments: [], returned: null }));
    });

    it('should return a new Snapshot with an added item at the end', () => {
      const newSnapshot = add(prevSnapshot, ['D']);

      expect(newSnapshot.get('listValues').size).toBe(4);

      const newValues = newSnapshot.get('listValues').map((item) => item.get('value'));

      expect(newValues).toEqual(List(['A', 'B', 'C', 'D']));
      expect(newSnapshot.get('command')).toEqual(Map({ method: 'add', arguments: ['D'], returned: null }));
    });

    it('should return a new Snapshot with an added item at the beginning', () => {
      const newSnapshot = add(prevSnapshot, [0, 'D']);

      expect(newSnapshot.get('listValues').size).toBe(4);

      const newValues = newSnapshot.get('listValues').map((item) => item.get('value'));

      expect(newValues).toEqual(List(['D', 'A', 'B', 'C']));
      expect(newSnapshot.get('command')).toEqual(Map({ method: 'add', arguments: [0, 'D'], returned: null }));
    });

    it('should return a new Snapshot with an added item somewhere in the middle', () => {
      const newSnapshot = add(prevSnapshot, [1, 'D']);

      expect(newSnapshot.get('listValues').size).toBe(4);

      const newValues = newSnapshot.get('listValues').map((item) => item.get('value'));

      expect(newValues).toEqual(List(['A', 'D', 'B', 'C']));
      expect(newSnapshot.get('command')).toEqual(Map({ method: 'add', arguments: [1, 'D'], returned: null }));
    });
  });

  describe('add to empty list', () => {
    let prevSnapshot; 

    beforeEach(() => {
      prevSnapshot = Snapshot(List([]), null);
    });

    it('should return a new Snapshot with the initial item added', () => {
      const newSnapshot = add(prevSnapshot, ['D']);

      expect(newSnapshot.get('listValues').size).toBe(1);

      const newValues = newSnapshot.get('listValues').map((item) => item.get('value'));

      expect(newValues).toEqual(List(['D']));
      expect(newSnapshot.get('command')).toEqual(Map({ method: 'add', arguments: ['D'], returned: null }));
    });

    it('should return a new Snapshot with the initial item added at index 0', () => {
      const newSnapshot = add(prevSnapshot, [0, 'D']);

      expect(newSnapshot.get('listValues').size).toBe(1);

      const newValues = newSnapshot.get('listValues').map((item) => item.get('value'));

      expect(newValues).toEqual(List(['D']));
      expect(newSnapshot.get('command')).toEqual(Map({ method: 'add', arguments: [0, 'D'], returned: null }));
    });
  });

  describe('get from list', () => {
    let prevSnapshot; 

    beforeEach(() => {
      prevSnapshot = Snapshot(List([
        Map({ value: 'A', id: 'A1' }),
        Map({ value: 'B', id: 'B1' }),
        Map({ value: 'C', id: 'C1' })
      ]), Map({ method: '', arguments: [], returned: null }));
    });

    it('should fetch the correct value from the list and not modify list values', () => {
      const newSnapshot = get(prevSnapshot, [0]);
      expect(newSnapshot.get('command').get('returned').get('value')).toEqual('A');

      const newValues = newSnapshot.get('listValues').map((item) => item.get('value'));
      expect(newValues).toEqual(List(['A', 'B', 'C']));
    });
  });

  describe('set value in list', () => {
    let prevSnapshot; 

    beforeEach(() => {
      prevSnapshot = Snapshot(List([
        Map({ value: 'A', id: 'A1' }),
        Map({ value: 'B', id: 'B1' }),
        Map({ value: 'C', id: 'C1' })
      ]), Map({ method: '', arguments: [], returned: null }));
    });

    it('should set the value at index to the new value', () => {
      const newSnapshot = set(prevSnapshot, [0, 'D']);
      expect(newSnapshot.get('command').get('returned').get('value')).toEqual('A');

      const newListValues = newSnapshot.get('listValues');
      expect(newListValues.size).toBe(prevSnapshot.get('listValues').size);
      expect(newListValues.get(0).get('value')).toEqual('D');
    });
  });

  describe('remove value from list', () => {
    let prevSnapshot;

    beforeEach(() => {
      prevSnapshot = Snapshot(List([
        Map({ value: 'A', id: 'A1' }),
        Map({ value: 'B', id: 'B1' }),
        Map({ value: 'C', id: 'C1' })
      ]), Map({ method: '', arguments: [], returned: null }));
    });

    it('should remove the value at index', () => {
      const newSnapshot = remove(prevSnapshot, [0]);
      expect(newSnapshot.get('command').get('returned').get('value')).toEqual('A');

      const newListValues = newSnapshot.get('listValues');
      expect(newListValues.size).toBe(prevSnapshot.get('listValues').size - 1);
      expect(newListValues.get(0).get('value')).toEqual('B');
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