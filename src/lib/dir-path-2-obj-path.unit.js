import { dirPath2ObjPath } from './dir-path-2-obj-path.js'
import test from 'ava'

test(`Converts paths into dot notation`, t => {
  t.is(dirPath2ObjPath('/some-path/papo.js'), 'somePath.papo')
  t.is(dirPath2ObjPath('/some-path/index.js'), 'somePath')
  t.is(dirPath2ObjPath('other-path/another/path'), 'otherPath.another.path')
  t.is(dirPath2ObjPath('/'), '')
  t.is(dirPath2ObjPath('/index.js'), '')
  t.is(dirPath2ObjPath('/papo.js'), 'papo')
  t.is(dirPath2ObjPath('/papo-con-late.js'), 'papoConLate')
})
