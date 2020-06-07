import camelCase from 'lodash/camelCase.js'
import trim from 'lodash/trim'

export function dirPath2ObjPath (dirPath = '') {
  return trim(dirPath, '/').replace(/((^|\/)index)?\.js(on)?$/i, '').split('/').map(camelCase).join('.')
}
