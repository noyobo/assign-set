const set = require('../index');

const assignSet = (obj, path, value) => {
  if (typeof obj === 'string') {
    value = path;
    path = obj;
    obj = {};
  }

  set(obj, path, value);
  return obj;
};

// prettier-ignore
describe('set', () => {
  it('should set a value when unset', () => {
    expect(assignSet({}, 'a.b.c', 1)).toEqual({ a: { b: { c: 1 } } });
    expect(assignSet({}, 'a.b.c', '1')).toEqual({ a: { b: { c: '1' } } });
    expect(assignSet({}, 'a.b.c', false)).toEqual({ a: { b: { c: false } } });
    expect(assignSet({}, 'a.b.c', [1])).toEqual({ a: { b: { c: [1] } } });
    expect(assignSet({}, 'a.b.c', { a: 1 })).toEqual({ a: { b: { c: { a: 1 } } } });

    expect(assignSet({}, 'a.1.c', 1)).toEqual({ a: { 1: { c: 1 } } });
    expect(assignSet({}, 'a.1.c', '1')).toEqual({ a: { 1: { c: '1' } } });
    expect(assignSet({}, 'a.1.c', false)).toEqual({ a: { 1: { c: false } } });
    expect(assignSet({}, 'a.1.c', [1])).toEqual({ a: { 1: { c: [1] } } });
    expect(assignSet({}, 'a.1.c', { a: 1 })).toEqual({ a: { 1: { c: { a: 1 } } } });

    expect(assignSet({}, 'a[1].c', 1)).toEqual({ a: [undefined, { c: 1 }] });
    expect(assignSet({}, 'a[1].c', '1')).toEqual({ a: [undefined, { c: '1' }] });
    expect(assignSet({}, 'a[1].c', false)).toEqual({ a: [undefined, { c: false }] });
    expect(assignSet({}, 'a[1].c', [1])).toEqual({ a: [undefined, { c: [1] }] });
    expect(assignSet({}, 'a[1].c', { a: 1 })).toEqual({ a: [undefined, { c: { a: 1 } }] });

    expect(assignSet({}, 'a[1][1].c', 1)).toEqual({ a: [undefined, [undefined, { c: 1 }]] });
    expect(assignSet({}, 'a[1][1].c', '1')).toEqual({ a: [undefined, [undefined, { c: '1' }]] });
    expect(assignSet({}, 'a[1][1].c', false)).toEqual({ a: [undefined, [undefined, { c: false }]] });
    expect(assignSet({}, 'a[1][1].c', [1])).toEqual({ a: [undefined, [undefined, { c: [1] }]] });
    expect(assignSet({}, 'a[1][1].c', { a: 1 })).toEqual({ a: [undefined, [undefined, { c: { a: 1 } }]] });
  });

  it('should update a value on array', () => {
    expect(assignSet({ a: [] }, 'a.b.c', 1)).toEqual({ a: { b: { c: 1 } } });
    expect(assignSet({ a: [] }, 'a.b.c', '1')).toEqual({ a: { b: { c: '1' } } });
    expect(assignSet({ a: [] }, 'a.b.c', false)).toEqual({ a: { b: { c: false } } });
    expect(assignSet({ a: [] }, 'a.b.c', [1])).toEqual({ a: { b: { c: [1] } } });
    expect(assignSet({ a: [] }, 'a.b.c', { a: 1 })).toEqual({ a: { b: { c: { a: 1 } } } });

    expect(assignSet({ a: [] }, 'a.1.c', 1)).toEqual({ a: [undefined, { c: 1 } ] });
    expect(assignSet({ a: [] }, 'a.1.c', '1')).toEqual({ a: [undefined, { c: '1' } ] });
    expect(assignSet({ a: [] }, 'a.1.c', false)).toEqual({ a: [undefined, { c: false } ] });
    expect(assignSet({ a: [] }, 'a.1.c', [1])).toEqual({ a: [undefined, { c: [1] } ] });
    expect(assignSet({ a: [] }, 'a.1.c', { a: 1 })).toEqual({ a: [undefined, { c: { a: 1 } } ] });

    expect(assignSet({ a: [] }, 'a[1].c', 1)).toEqual({ a: [undefined, { c: 1 }] });
    // 已经是数组，保持原对象形式
    expect(assignSet({ a: [] }, 'a["1"].c', 1)).toEqual({ a: [undefined, { c: 1 }] });
    // 兼容模式，旧版的 path 设置模式
    expect(assignSet({}, 'a["1"].c', 1)).toEqual({ a: [undefined, { c: 1 }] });
    expect(assignSet({}, 'a["1"]', {c:1})).toEqual({ a: [undefined, { c: 1 }] });

    expect(assignSet({ a: [] }, 'a[1].c', '1')).toEqual({ a: [undefined, { c: '1' }] });
    expect(assignSet({ a: [] }, 'a[1].c', false)).toEqual({ a: [undefined, { c: false }] });
    expect(assignSet({ a: [] }, 'a[1].c', [1])).toEqual({ a: [undefined, { c: [1] }] });
    expect(assignSet({ a: [] }, 'a[1].c', { a: 1 })).toEqual({ a: [undefined, { c: { a: 1 } }] });

    expect(assignSet({ a: [] }, 'a[1][1].c', 1)).toEqual({ a: [undefined, [undefined, { c: 1 }]] });
    expect(assignSet({ a: [] }, 'a[1][1].c', '1')).toEqual({ a: [undefined, [undefined, { c: '1' }]] });
    expect(assignSet({ a: [] }, 'a[1][1].c', false)).toEqual({ a: [undefined, [undefined, { c: false }]] });
    expect(assignSet({ a: [] }, 'a[1][1].c', [1])).toEqual({ a: [undefined, [undefined, { c: [1] }]] });
    expect(assignSet({ a: [] }, 'a[1][1].c', { a: 1 })).toEqual({ a: [undefined, [undefined, { c: { a: 1 } }]] });
  });

  it('should update a value on object', () => {
    expect(assignSet({ a: { f: 2 } }, 'a.b.c', 1)).toEqual({ a: { f: 2, b: { c: 1 } } });
    expect(assignSet({ a: { f: 2 } }, 'a.b.c', '1')).toEqual({ a: { f: 2, b: { c: '1' } } });
    expect(assignSet({ a: { f: 2 } }, 'a.b.c', false)).toEqual({ a: { f: 2, b: { c: false } } });
    expect(assignSet({ a: { f: 2 } }, 'a.b.c', [1])).toEqual({ a: { f: 2, b: { c: [1] } } });
    expect(assignSet({ a: { f: 2 } }, 'a.b.c', { a: 1 })).toEqual({ a: { f: 2, b: { c: { a: 1 } } } });

    expect(assignSet({ a: { f: 2 } }, 'a.1.c', 1)).toEqual({ a: { f: 2, 1: { c: 1 } } });
    expect(assignSet({ a: { f: 2 } }, 'a.1.c', '1')).toEqual({ a: { f: 2, 1: { c: '1' } } });
    expect(assignSet({ a: { f: 2 } }, 'a.1.c', false)).toEqual({ a: { f: 2, 1: { c: false } } });
    expect(assignSet({ a: { f: 2 } }, 'a.1.c', [1])).toEqual({ a: { f: 2, 1: { c: [1] } } });
    expect(assignSet({ a: { f: 2 } }, 'a.1.c', { a: 1 })).toEqual({ a: { f: 2, 1: { c: { a: 1 } } } });

    expect(assignSet({ a: { f: 2 } }, 'a[1].c', 1)).toEqual({ a: [undefined, { c: 1 }] });
    expect(assignSet({ a: { f: 2 } }, 'a[1].c', '1')).toEqual({ a: [undefined, { c: '1' }] });
    expect(assignSet({ a: { f: 2 } }, 'a[1].c', false)).toEqual({ a: [undefined, { c: false }] });
    expect(assignSet({ a: { f: 2 } }, 'a[1].c', [1])).toEqual({ a: [undefined, { c: [1] }] });
    expect(assignSet({ a: { f: 2 } }, 'a[1].c', { a: 1 })).toEqual({ a: [undefined, { c: { a: 1 } }] });

    expect(assignSet({ a: { f: 2 } }, 'a[1][1].c', 1)).toEqual({ a: [undefined, [undefined, { c: 1 }]] });
    expect(assignSet({ a: { f: 2 } }, 'a[1][1].c', '1')).toEqual({ a: [undefined, [undefined, { c: '1' }]] });
    expect(assignSet({ a: { f: 2 } }, 'a[1][1].c', false)).toEqual({ a: [undefined, [undefined, { c: false }]] });
    expect(assignSet({ a: { f: 2 } }, 'a[1][1].c', [1])).toEqual({ a: [undefined, [undefined, { c: [1] }]] });
    expect(assignSet({ a: { f: 2 } }, 'a[1][1].c', { a: 1 })).toEqual({ a: [undefined, [undefined, { c: { a: 1 } }]] });
  });

  it('should update a value is boolean', () => {
    expect(assignSet({ a: true }, 'a.b.c', 1)).toEqual({ a: { b: { c: 1 } } });
    expect(assignSet({ a: true }, 'a.b.c', '1')).toEqual({ a: { b: { c: '1' } } });
    expect(assignSet({ a: true }, 'a.b.c', false)).toEqual({ a: { b: { c: false } } });
    expect(assignSet({ a: true }, 'a.b.c', [1])).toEqual({ a: { b: { c: [1] } } });
    expect(assignSet({ a: true }, 'a.b.c', { a: 1 })).toEqual({ a: { b: { c: { a: 1 } } } });

    expect(assignSet({ a: true }, 'a.1.c', 1)).toEqual({ a: { 1: { c: 1 } } });
    expect(assignSet({ a: true }, 'a.1.c', '1')).toEqual({ a: { 1: { c: '1' } } });
    expect(assignSet({ a: true }, 'a.1.c', false)).toEqual({ a: { 1: { c: false } } });
    expect(assignSet({ a: true }, 'a.1.c', [1])).toEqual({ a: { 1: { c: [1] } } });
    expect(assignSet({ a: true }, 'a.1.c', { a: 1 })).toEqual({ a: { 1: { c: { a: 1 } } } });

    expect(assignSet({ a: true }, 'a[1].c', 1)).toEqual({ a: [undefined, { c: 1 }] });
    expect(assignSet({ a: true }, 'a[1].c', '1')).toEqual({ a: [undefined, { c: '1' }] });
    expect(assignSet({ a: true }, 'a[1].c', false)).toEqual({ a: [undefined, { c: false }] });
    expect(assignSet({ a: true }, 'a[1].c', [1])).toEqual({ a: [undefined, { c: [1] }] });
    expect(assignSet({ a: true }, 'a[1].c', { a: 1 })).toEqual({ a: [undefined, { c: { a: 1 } }] });

    expect(assignSet({ a: true }, 'a[1][1].c', 1)).toEqual({ a: [undefined, [undefined, { c: 1 }]] });
    expect(assignSet({ a: true }, 'a[1][1].c', '1')).toEqual({ a: [undefined, [undefined, { c: '1' }]] });
    expect(assignSet({ a: true }, 'a[1][1].c', false)).toEqual({ a: [undefined, [undefined, { c: false }]] });
    expect(assignSet({ a: true }, 'a[1][1].c', [1])).toEqual({ a: [undefined, [undefined, { c: [1] }]] });
    expect(assignSet({ a: true }, 'a[1][1].c', { a: 1 })).toEqual({ a: [undefined, [undefined, { c: { a: 1 } }]] });
  });
});
