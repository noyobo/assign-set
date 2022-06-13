const set = require('../index');

// prettier-ignore
describe('set', () => {
  it('should assign to array', () => {
    let t = [];
    set(t, 'a.b.c', 'd');
    expect(t.a).toEqual({ b: { c: 'd' } });

    t = null;
    set(t, 'a.b.c', 'd');
    expect(t).toEqual(null);
  });
});
