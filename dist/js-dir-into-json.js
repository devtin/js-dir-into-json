/*!
 * js-dir-into-json v2.5.0
 * (c) 2020 Martin Rafael Gonzalez <tin@devtin.io>
 * MIT
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var deepListDir = require('deep-list-dir');
var merge = require('deepmerge');
var path = require('path');
var set = require('lodash/set');
var camelCase = require('lodash/camelCase.js');
var trim = require('lodash/trim');
var isPlainObject = require('is-plain-object');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var merge__default = /*#__PURE__*/_interopDefaultLegacy(merge);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var set__default = /*#__PURE__*/_interopDefaultLegacy(set);
var camelCase__default = /*#__PURE__*/_interopDefaultLegacy(camelCase);
var trim__default = /*#__PURE__*/_interopDefaultLegacy(trim);
var isPlainObject__default = /*#__PURE__*/_interopDefaultLegacy(isPlainObject);

function dirPath2ObjPath (dirPath = '') {
  return trim__default['default'](dirPath, '/').replace(/((^|\/)index)?\.js(on)?$/i, '').split('/').map(camelCase__default['default']).join('.')
}

const unwrapDefaults = (obj) => {
  if (typeof obj !== 'object' || Array.isArray(obj) || obj === null) {
    return obj
  }

  if (Object.keys(obj).length === 1 && obj.default) {
    return obj.default
  }

  Object.keys(obj).forEach(prop => {
    if (Object.getOwnPropertyDescriptor(obj, prop).writable) {
      obj[prop] = unwrapDefaults(obj[prop]);
    }
  });

  return obj
};

/**
 * @param {String[]} fileList - List of js / json files
 * @param {Object} [options]
 * @param {Function|NodeRequire} [options.fileLoader=esm] - Function that resolves the files
 * @param {Function} [options.path2dot=dirPath2ObjPath] - Function that receives the file path and resolves a dot notation path
 * @return {Promise<{}>}
 */
function fileListIntoJson (fileList, { fileLoader = require, base = './', path2dot = dirPath2ObjPath } = {}) {
  let finalObject = {};
  fileList.forEach(jsFile => {
    const dotProp = path2dot(path__default['default'].relative(base, jsFile));
    let fileContent = dotProp ? set__default['default']({}, dotProp, fileLoader(jsFile)) : fileLoader(jsFile);

    fileContent = unwrapDefaults(fileContent);
    finalObject = merge__default['default'](finalObject, fileContent, { isMergeableObject: isPlainObject__default['default'] });
  });
  return finalObject
}

const settings = {
  fileLoader: require
};

async function jsDirIntoJson (directory, { extensions = ['*.js', '*.json'], fileLoader = settings.fileLoader, path2dot } = {}) {
  return fileListIntoJson(await deepListDir.deepListDir(path__default['default'].resolve(process.cwd(), directory), { pattern: extensions }), { fileLoader, base: directory, path2dot })
}

function jsDirIntoJsonSync (directory, { extensions = ['*.js', '*.json'], fileLoader = settings.fileLoader, path2dot } = {}) {
  return fileListIntoJson(deepListDir.deepListDirSync(path__default['default'].resolve(process.cwd(), directory), { pattern: extensions }), { fileLoader, base: directory, path2dot })
}

exports.jsDirIntoJson = jsDirIntoJson;
exports.jsDirIntoJsonSync = jsDirIntoJsonSync;
exports.settings = settings;
