import { describe, it, expect} from 'vitest';
import set from '../index';

// prettier-ignore
describe('set', () => {
  it('should assign field space', () => {
    let t = [];
    set(t, 'a.b .c', 'd');
    expect(t.a).toEqual({ 'b ': { c: 'd' } });

    t = [];
    set(t, 'a.[1] .c', 'd');
    expect(t.a).toEqual([undefined, {" ": {"c": "d"}}]);
  });
});
