const set = require('../index');

describe('update-set', () => {
  it('should set a value update nested paths value', () => {
    const obj = {};
    expect(set(obj, 'a.b.c', 1)).toEqual({
      a: {
        b: { c: { __value__: 1, __set__: true } },
      },
    });
    expect(set(obj, 'a.b.d', { e: 2 })).toEqual({
      a: {
        b: {
          c: { __value__: 1, __set__: true },
          d: { __value__: { e: 2 }, __set__: true },
        },
      },
    });

    expect(set(obj, 'a.b.d', { f: 3 })).toEqual({
      a: {
        b: {
          c: { __value__: 1, __set__: true },
          d: { __value__: { f: 3 }, __set__: true },
        },
      },
    });

    expect(set(obj, 'a.b.d.f', { g: 4 })).toEqual({
      a: {
        b: {
          c: { __value__: 1, __set__: true },
          d: {
            __value__: { f: { __value__: { g: 4 }, __set__: true } },
            __set__: true,
          },
        },
      },
    });
  });

  it('should update children paths value', function () {
    const obj = {};
    set(obj, 'root', {
      children: [1],
      nodes: {
        1: {
          children: [2],
          nodes: { 2: { props: { b: 456 } } },
          props: { a: 123 },
        },
      },
    });
    expect(obj).toEqual({
      root: {
        __set__: true,
        __value__: {
          children: [1],
          nodes: {
            1: {
              children: [2],
              nodes: { 2: { props: { b: 456 } } },
              props: { a: 123 },
            },
          },
        },
      },
    });
    set(obj, 'root.nodes.1.props.a', 789);
    expect(obj).toEqual({
      root: {
        __set__: true,
        __value__: {
          children: [1],
          nodes: {
            1: {
              children: [2],
              nodes: { 2: { props: { b: 456 } } },
              props: { a: { __set__: true, __value__: 789 } },
            },
          },
        },
      },
    });
    set(obj, 'root.nodes.1.nodes.2.props.b', 654);
    expect(obj).toEqual({
      root: {
        __set__: true,
        __value__: {
          children: [1],
          nodes: {
            1: {
              children: [2],
              nodes: { 2: { props: { b: { __set__: true, __value__: 654 } } } },
              props: { a: { __set__: true, __value__: 789 } },
            },
          },
        },
      },
    });
  });

  it('should update children paths array value', function () {
    const obj = {};
    expect(set(obj, 'a[0].c', 1)).toEqual({
      a: [
        {
          c: { __value__: 1, __set__: true },
        },
      ],
    });
    expect(set(obj, 'a[0].c', 2)).toEqual({
      a: [
        {
          c: { __value__: 2, __set__: true },
        },
      ],
    });
    expect(set(obj, 'a[0].d', 2)).toEqual({
      a: [
        {
          c: { __value__: 2, __set__: true },
          d: { __value__: 2, __set__: true },
        },
      ],
    });
    expect(set(obj, 'a[0]', 1)).toEqual({
      a: [{ __value__: 1, __set__: true }],
    });
    expect(set(obj, 'a[0]', 2)).toEqual({
      a: [{ __value__: 2, __set__: true }],
    });
  });
});
