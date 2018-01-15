import { List, Map } from 'immutable';
import { Snapshot, add, get, set, remove, size, clear, contains, indexOf, isEmpty, lastIndexOf } from './Snapshot';

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

  describe('remove value at index from list', () => {
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

  describe('remove first occurrence of value if found', () => {
    let prevSnapshot;

    beforeEach(() => {
      prevSnapshot = Snapshot(List([
        Map({ value: 'A', id: 'A1' }),
        Map({ value: 'B', id: 'B1' }),
        Map({ value: 'A', id: 'A2' }),
        Map({ value: 'C', id: 'C1' })
      ]), Map({ method: '', arguments: [], returned: null }));
    });

    it('should remove the first occurrence of a value that is present in the list and return true', () => {
      const newSnapshot = remove(prevSnapshot, ['A']);
      expect(newSnapshot.get('command').get('returned')).toEqual(true);

      const newListValues = newSnapshot.get('listValues');
      expect(newListValues.size).toBe(prevSnapshot.get('listValues').size - 1);
      expect(newListValues.get(0).get('value')).toEqual('B');
    });

    it('should not remove anything when value is not present, should return false', () => {
      const newSnapshot = remove(prevSnapshot, ['E']);
      expect(newSnapshot.get('command').get('returned')).toEqual(false);

      const newListValues = newSnapshot.get('listValues');
      expect(newListValues.size).toBe(prevSnapshot.get('listValues').size);
      expect(newSnapshot.get('listValues')).toEqual(prevSnapshot.get('listValues'));
    });
  });

  describe('get size of list', () => {
    let prevSnapshot; 

    beforeEach(() => {
      prevSnapshot = Snapshot(List([
        Map({ value: 'A', id: 'A1' }),
        Map({ value: 'B', id: 'B1' }),
        Map({ value: 'C', id: 'C1' })
      ]), Map({ method: '', arguments: [], returned: null }));
    });

    it('should fetch the correct value from the list and not modify list values', () => {
      const newSnapshot = size(prevSnapshot, []);
      expect(newSnapshot.get('command').get('returned')).toBe(3);
      expect(newSnapshot.get('listValues')).toEqual(prevSnapshot.get('listValues'));
    });
  });

  describe('clear list', () => {
    let prevSnapshot; 

    beforeEach(() => {
      prevSnapshot = Snapshot(List([
        Map({ value: 'A', id: 'A1' }),
        Map({ value: 'B', id: 'B1' }),
        Map({ value: 'C', id: 'C1' })
      ]), Map({ method: '', arguments: [], returned: null }));
    });

    it('should clear out all values', () => {
      const newSnapshot = clear(prevSnapshot);
      expect(newSnapshot.get('command').get('returned')).toBe(null);
      expect(newSnapshot.get('listValues').size).toBe(0);
    });
  });

  describe('check if list contains a specific value', () => {
    let prevSnapshot; 

    beforeEach(() => {
      prevSnapshot = Snapshot(List([
        Map({ value: 'A', id: 'A1' }),
        Map({ value: 'B', id: 'B1' }),
        Map({ value: 'C', id: 'C1' })
      ]), Map({ method: '', arguments: [], returned: null }));
    });

    it('should return true when searching for a value that is in the list', () => {
      const newSnapshot = contains(prevSnapshot, ['B']);
      expect(newSnapshot.get('command').get('returned')).toBe(true);
      expect(newSnapshot.get('listValues').size).toBe(3);
      expect(newSnapshot.get('listValues')).toEqual(prevSnapshot.get('listValues'));
    });

    it('should return false when searching for a value that is not in the list', () => {
      const newSnapshot = contains(prevSnapshot, ['D']);
      expect(newSnapshot.get('command').get('returned')).toBe(false);
      expect(newSnapshot.get('listValues').size).toBe(3);
      expect(newSnapshot.get('listValues')).toEqual(prevSnapshot.get('listValues'));
    });
  });

  describe('find index of first occurrence of value', () => {
    let prevSnapshot; 

    beforeEach(() => {
      prevSnapshot = Snapshot(List([
        Map({ value: 'A', id: 'A1' }),
        Map({ value: 'B', id: 'B1' }),
        Map({ value: 'A', id: 'A2' }),
        Map({ value: 'C', id: 'C1' }),
      ]), Map({ method: '', arguments: [], returned: null }));
    });

    it('should return the correct index of the first occurrence of a value that is in the list', () => {
      const newSnapshot = indexOf(prevSnapshot, ['A']);
      expect(newSnapshot.get('command').get('returned')).toBe(0);
      expect(newSnapshot.get('listValues').size).toBe(4);
      expect(newSnapshot.get('listValues')).toEqual(prevSnapshot.get('listValues'));
    });

    it('should return the correct index of the first occurrence of a value that is in the list', () => {
      const newSnapshot = indexOf(prevSnapshot, ['B']);
      expect(newSnapshot.get('command').get('returned')).toBe(1);
      expect(newSnapshot.get('listValues').size).toBe(4);
      expect(newSnapshot.get('listValues')).toEqual(prevSnapshot.get('listValues'));
    });

    it('should return -1 when the value that is not in the list', () => {
      const newSnapshot = indexOf(prevSnapshot, ['E']);
      expect(newSnapshot.get('command').get('returned')).toBe(-1);
      expect(newSnapshot.get('listValues').size).toBe(4);
      expect(newSnapshot.get('listValues')).toEqual(prevSnapshot.get('listValues'));
    });
  });

  describe('find index of last occurrence of value', () => {
    let prevSnapshot; 

    beforeEach(() => {
      prevSnapshot = Snapshot(List([
        Map({ value: 'A', id: 'A1' }),
        Map({ value: 'B', id: 'B1' }),
        Map({ value: 'A', id: 'A2' }),
        Map({ value: 'C', id: 'C1' }),
      ]), Map({ method: '', arguments: [], returned: null }));
    });

    it('should return the correct index of the last occurrence of a value that is in the list', () => {
      const newSnapshot = lastIndexOf(prevSnapshot, ['A']);
      expect(newSnapshot.get('command').get('returned')).toBe(2);
      expect(newSnapshot.get('listValues').size).toBe(4);
      expect(newSnapshot.get('listValues')).toEqual(prevSnapshot.get('listValues'));
    });

    it('should return the correct index of the last occurrence of a value that is in the list', () => {
      const newSnapshot = lastIndexOf(prevSnapshot, ['B']);
      expect(newSnapshot.get('command').get('returned')).toBe(1);
      expect(newSnapshot.get('listValues').size).toBe(4);
      expect(newSnapshot.get('listValues')).toEqual(prevSnapshot.get('listValues'));
    });

    it('should return -1 when the value that is not in the list', () => {
      const newSnapshot = indexOf(prevSnapshot, ['E']);
      expect(newSnapshot.get('command').get('returned')).toBe(-1);
      expect(newSnapshot.get('listValues').size).toBe(4);
      expect(newSnapshot.get('listValues')).toEqual(prevSnapshot.get('listValues'));
    });
  });

  describe('check if list is empty', () => {
    it('should return true when the list is empty', () => {
      let prevSnapshot; 

      prevSnapshot = Snapshot(List(), Map({ method: '', arguments: [], returned: null }));

      const newSnapshot = isEmpty(prevSnapshot);

      expect(newSnapshot.get('command').get('returned')).toBe(true);
      expect(newSnapshot.get('listValues').size).toBe(0);
      expect(newSnapshot.get('listValues')).toEqual(prevSnapshot.get('listValues'));
    });

    it('should return false when the list is not empty', () => {
      let prevSnapshot; 

      prevSnapshot = Snapshot(List([
        Map({ value: 'A', id: 'A1' }),
        Map({ value: 'B', id: 'B1' })
      ]), Map({ method: '', arguments: [], returned: null }));
      
      const newSnapshot = isEmpty(prevSnapshot);

      expect(newSnapshot.get('command').get('returned')).toBe(false);
      expect(newSnapshot.get('listValues').size).toBe(2);
      expect(newSnapshot.get('listValues')).toEqual(prevSnapshot.get('listValues'));
    });
  });
});