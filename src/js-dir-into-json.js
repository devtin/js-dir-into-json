import { deepListDir } from 'deep-list-dir'
import { fileListIntoJson } from './lib/file-list-into-json.js'

/* eslint-disable-next-line */
require = require('esm')(module)

export async function jsDirIntoJson (directory, { extensions = ['*.js', '*.json'], fileLoader } = {}) {
  return fileListIntoJson(await deepListDir(directory, { pattern: extensions }), { fileLoader, base: directory })
}
