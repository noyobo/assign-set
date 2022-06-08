const get = require('lodash.get');
const set = require('../lib/index');

const assignSet = (path, value, obj) => {
  obj = obj || {};
  set(obj, path, value);
  return obj;
};

describe('set', () => {
  it('should work', () => {
    let t;

    t = assignSet('a.b.c', 'd');
    expect(get(t, 'a.b.c')).toBe('d');

    t = assignSet('a.b.6.c', 'd');
    expect(get(t, 'a.b')).toEqual({ 6: { c: 'd' } });

    t = assignSet('a[]', 'd');
    expect(get(t, 'a')).toEqual({ '': 'd' });

    t = assignSet('a.b[6].c', 'd');
    expect(get(t, 'a.b')).toEqual([, , , , , , { c: 'd' }]);

    t = assignSet('a.b["6"].c', 'd');
    expect(get(t, 'a.b')).toEqual({ 6: { c: 'd' } });

    t = assignSet('a.b["a_6"].c', 'd');
    expect(get(t, 'a.b')).toEqual({ a_6: { c: 'd' } });

    t = assignSet('a.b["a-[]6"].c', 'd');
    expect(get(t, 'a.b')).toEqual({ 'a-[]6': { c: 'd' } });

    t = assignSet('a.b[1][2]["b"].c', 'd');
    expect(get(t, 'a.b')).toEqual([, [, , { b: { c: 'd' } }]]);
  });

  it('should assign to array', () => {
    let t = [];
    set(t, 'a.b.c', 'd');
    expect(t.a).toEqual({ b: { c: 'd' } });

    t = null;
    set(t, 'a.b.c', 'd');
    expect(t).toEqual(null);
  });
});
