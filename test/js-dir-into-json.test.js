import test from 'ava'
import path from 'path'
import { jsDirIntoJson } from '../'

test(`Imports all js/json files into a single object preserving the file structure as the object structure`, async t => {
  const res = await jsDirIntoJson(path.join(__dirname, './benchmark'))
  t.deepEqual(res, {
    'users': {
      'maria': {
        'name': 'Maria',
        'email': 'maria@hotmail.com'
      },
      'martin': {
        'name': 'Martin',
        'email': 'tin@devtin.io'
      }
    },
    'products': [
      'Product 1',
      'Product 2'
    ]
  })
})
