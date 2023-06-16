const set = require('../index');

describe('set', () => {
  it('should assign field space', () => {
    let t = [];
    set(t, 'a.b .c', 'd');
    expect(t.a).toEqual({ 'b ': { c: { __set__: true, __value__: 'd' } } });

    t = [];
    set(t, 'a.[1] .c', 'd');
    expect(t.a).toEqual([
      undefined,
      { ' ': { c: { __set__: true, __value__: 'd' } } },
    ]);
  });
});
