import assert from 'node:assert/strict'
import {test} from 'node:test'
import {codes} from '../lib/errors.js'
import {defaultGetFormatWithoutErrors} from '../lib/get-format.js'

test('object type is represented once when named instances are accepted', () => {
  const error = new codes.ERR_INVALID_ARG_TYPE('x', ['object', 'Date'], 1)
  assert.equal(error.message, 'The "x" argument must be an instance of Date or Object. Received type number (1)')
})

test('data URL headers do not backtrack without a separator', {timeout: 1000}, () => {
  const context = {parentURL: import.meta.url}
  assert.equal(defaultGetFormatWithoutErrors(new URL('data:text/' + 'a'.repeat(100000)), context), null)
  assert.equal(defaultGetFormatWithoutErrors(new URL('data:text/javascript,export%20default%201'), context), 'module')
  assert.equal(defaultGetFormatWithoutErrors(new URL('data:text/javascript;base64,ZXhwb3J0IGRlZmF1bHQgMQ=='), context), 'module')
  assert.equal(defaultGetFormatWithoutErrors(new URL('data:text/plain,hello'), context), null)
})
