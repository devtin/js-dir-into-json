import { deepListDir, deepListDirSync } from 'deep-list-dir'
import { fileListIntoJson } from './lib/file-list-into-json.js'
import path from 'path'

export const settings = {
  fileLoader: require
}

export async function jsDirIntoJson (directory, { extensions = ['*.js', '*.json'], fileLoader = settings.fileLoader } = {}) {
  return fileListIntoJson(await deepListDir(path.resolve(process.cwd(), directory), { pattern: extensions }), { fileLoader, base: directory })
}

export function jsDirIntoJsonSync (directory, { extensions = ['*.js', '*.json'], fileLoader = settings.fileLoader } = {}) {
  return fileListIntoJson(deepListDirSync(path.resolve(process.cwd(), directory), { pattern: extensions }), { fileLoader, base: directory })
}
