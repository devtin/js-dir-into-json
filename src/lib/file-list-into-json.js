import merge from 'deepmerge'
import path from 'path'
import set from 'lodash/set'
import { dirPath2ObjPath } from './dir-path-2-obj-path.js'

const unwrapDefaults = (obj) => {
  if (typeof obj !== 'object' || Array.isArray(obj) || obj === null) {
    return obj
  }

  if (Object.keys(obj).length === 1 && obj.default) {
    return obj.default
  }

  Object.keys(obj).forEach(prop => {
    obj[prop] = unwrapDefaults(obj[prop])
  })

  return obj
}

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

    fileContent = unwrapDefaults(fileContent)
    finalObject = merge(finalObject, fileContent)
  })
  return finalObject
}
