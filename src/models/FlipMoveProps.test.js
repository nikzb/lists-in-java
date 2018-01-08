import { Map } from 'immutable';
import { FlipMoveProps, timeToFinish } from './FlipMoveProps';

describe('FlipMoveProps', () => {
  it('should get an immutable Map with three properties', () => {
    const propsMap = FlipMoveProps({ duration: 750, delay: 250, staggerDelayBy: 10 });

    expect(propsMap.size).toBe(3);

    expect(propsMap.get('duration')).toBe(750);
    expect(propsMap.get('delay')).toBe(250);
    expect(propsMap.get('staggerDelayBy')).toBe(10);
  });

  it('should get correct time to finish', () => {
    const propsMap = FlipMoveProps({ duration: 750, delay: 250, staggerDelayBy: 10 });

    expect(timeToFinish(propsMap, 5)).toBe(1040);
  });
});
