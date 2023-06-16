const set = require('../index');

describe('set', () => {
  it('should assign to array', () => {
    let t = [];
    set(t, 'a.b.c', 'd');
    expect(t.a).toEqual({ b: { c: { __set__: true, __value__: 'd' } } });

    t = null;
    set(t, 'a.b.c', 'd');
    expect(t).toEqual(null);

    t = { list: [{ a: 1 }, { a: 2, isFold: false }, { a: 3 }] };
    set(t, 'list["1"].isFold', true);
    expect(t).toEqual({
      list: [
        { a: 1 },
        { a: 2, isFold: { __set__: true, __value__: true } },
        { a: 3 },
      ],
    });

    t = { list: [{ a: 1 }, { a: 2, isFold: false }, { a: 3 }] };
    set(t, 'list["-1"].isFold', true);
    expect(t).toEqual({
      list: { '-1': { isFold: { __set__: true, __value__: true } } },
    });
  });

  it('should assign to object', () => {
    let t = { list: { a: 1, b: 2, c: 3 } };
    set(t, 'list.d', true);
    expect(t).toEqual({
      list: { a: 1, b: 2, c: 3, d: { __set__: true, __value__: true } },
    });

    t = { list: { a: 1, b: 2, c: 3 } };
    set(t, 'list.1.d', true);
    expect(t).toEqual({
      list: { a: 1, b: 2, c: 3, 1: { d: { __set__: true, __value__: true } } },
    });

    t = { list: { a: 1, b: 2, c: 3 } };
    set(t, 'list[1].d', true);
    expect(t).toEqual({
      list: [undefined, { d: { __set__: true, __value__: true } }],
    });

    t = { list: { a: 1, b: 2, c: 3 } };
    set(t, 'list[-1].d', true);
    expect(t).toEqual({
      list: {
        a: 1,
        b: 2,
        c: 3,
        '-1': { d: { __set__: true, __value__: true } },
      },
    });
  });
});
