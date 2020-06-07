import merge from 'deepmerge'
import path from 'path'
import set from 'lodash/set'
import { dirPath2ObjPath } from './dir-path-2-obj-path.js'

/**
 * @param {String[]} fileList - List of js / json files
 * @param {Object} [options]
 * @param {Function|NodeRequire} [options.fileLoader=esm] - Function that resolves the files
 * @return {Promise<{}>}
 */
export function fileListIntoJson (fileList, { fileLoader = require, base = './' } = {}) {
  let finalObject = {}
  fileList.forEach(jsFile => {
    const dotProp = dirPath2ObjPath(path.relative(base, jsFile))
    let fileContent = dotProp ? set({}, dotProp, fileLoader(jsFile)) : fileLoader(jsFile)

    if (Object.keys(fileContent).length === 1 && fileContent.default) {
      fileContent = fileContent.default
    }
    finalObject = merge(finalObject, fileContent)
  })
  return finalObject
}
