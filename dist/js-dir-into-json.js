/*!
 * js-dir-into-json v2.0.3
 * (c) 2020 Martin Rafael Gonzalez <tin@devtin.io>
 * MIT
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var deepListDir = require('deep-list-dir');
var merge = _interopDefault(require('deepmerge'));
var path = _interopDefault(require('path'));
var set = _interopDefault(require('lodash/set'));
var camelCase = _interopDefault(require('lodash/camelCase.js'));
var trim = _interopDefault(require('lodash/trim'));

function dirPath2ObjPath (dirPath = '') {
  return trim(dirPath, '/').replace(/((^|\/)index)?\.js(on)?$/i, '').split('/').map(camelCase).join('.')
}

const unwrapDefaults = (obj) => {
  if (typeof obj !== 'object' || Array.isArray(obj) || obj === null) {
    return obj
  }

  if (Object.keys(obj).length === 1 && obj.default) {
    return obj.default
  }

  Object.keys(obj).forEach(prop => {
    obj[prop] = unwrapDefaults(obj[prop]);
  });

  return obj
};

/**
 * @param {String[]} fileList - List of js / json files
 * @param {Object} [options]
 * @param {Function|NodeRequire} [options.fileLoader=esm] - Function that resolves the files
 * @return {Promise<{}>}
 */
function fileListIntoJson (fileList, { fileLoader = require, base = './' } = {}) {
  let finalObject = {};
  fileList.forEach(jsFile => {
    const dotProp = dirPath2ObjPath(path.relative(base, jsFile));
    let fileContent = dotProp ? set({}, dotProp, fileLoader(jsFile)) : fileLoader(jsFile);

    fileContent = unwrapDefaults(fileContent);
    finalObject = merge(finalObject, fileContent);
  });
  return finalObject
}

const settings = {
  fileLoader: require
};

async function jsDirIntoJson (directory, { extensions = ['*.js', '*.json'], fileLoader = settings.fileLoader } = {}) {
  return fileListIntoJson(await deepListDir.deepListDir(path.resolve(process.cwd(), directory), { pattern: extensions }), { fileLoader, base: directory })
}

exports.jsDirIntoJson = jsDirIntoJson;
exports.settings = settings;
