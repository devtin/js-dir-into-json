# js-dir-into-json
> Loads content of found javascript and json files in given directory into a single structured object

<a href="https://www.npmjs.com/package/js-dir-into-json" target="_blank"><img src="https://img.shields.io/npm/v/js-dir-into-json.svg" alt="Version"></a>
[![tests](https://github.com/devtin/js-dir-into-json/workflows/test/badge.svg)](https://github.com/devtin/js-dir-into-json/actions)

This module deeply loads all `*.js` and `*.json` (configurable via `extensions`) files in given `directory` and creates
a single object preserving the file structure as the properties of the object, appending default exported content to
each endpoint.

## Example

Take the following file structure:

```
<directory>
├── users/
│   ├── index.js
│   ├── maria.json
│   └── martin.js
└── some-config.json
```

**users/index.js**
```js
module.exports = {
  'some-guy': 'Un-altered'
}
```

**users/maria.json**
```json
{
  "name": "Maria",
  "email": "maria@hotmail.com"
}
```

**users/martin.js**
```js
module.exports = {
  name: "Martin",
  email: "tin@devtin.io"
}
```

**some-config.js** (see esm support below)
```js
export default {
  products: [
    'Product 1',
    'Product 2'
  ]
}
```

And the following script:

```js
const { jsDirIntoJson, settings } = require('js-dir-into-json')

// to enable esm support
settings.fileLoader = require('esm')(module)

jsDirIntoJson('<directory>',
  {
    // extensions: ['*.js', '*.json'], // minimatch or RegExp
    // path2dot: dirPath2ObjPath, // see src/lib/dir-path-2-obj-path.js
    // fileLoader: require('esm') (defaults to require)
  }
).then(console.log)
```

**produces the following output**

```json
{
    "users": {
      "maria": {
        "name": "Maria",
        "email": "maria@hotmail.com"
      },
      "martin": {
        "name": "Martin",
        "email": "tin@devtin.io"
      },
      "olivia": "thats me!",
      "some-guy": "Un-altered"
    },
    "products": [
      "Product 1",
      "Product 2"
    ]
}
```

* * *

### License

[MIT](https://opensource.org/licenses/MIT)

&copy; 2020-present Martin Rafael Gonzalez
<tin@devtin.io>
