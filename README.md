# assign-set

[![](https://img.shields.io/npm/dw/assign-set?style=flat-square)](https://www.npmjs.com/package/assign-set)

Base on lodash.set, But the difference between Array and Array-like object

```js
const assignSet = require('assign-set');

assignSet(obj, 'a.2.c', 'value');
obj = { a: { 2: { c: 'value' } } };

assignSet(obj, 'a[2].c', 'value');
obj = { a: [undefined, undefined, { c: 'value' }] };
```

The difference of `lodash.set`

```js
const lodash = require('lodash.set');

assignSet(obj, 'a.2.c', 'value');
obj = { a: [undefined, undefined, { c: 'value' }] };

assignSet(obj, 'a[2].c', 'value');
obj = { a: [undefined, undefined, { c: 'value' }] };
```
