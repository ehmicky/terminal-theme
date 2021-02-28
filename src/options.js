import { stdout } from 'process'

import filterObj from 'filter-obj'
import isPlainObj from 'is-plain-obj'
import { validate } from 'jest-validate'

// Normalize options and assign default values
export const getOpts = function (defaultTheme, opts = {}) {
  validateOpts(defaultTheme, opts)
  const optsA = filterObj(opts, isDefined)
  const colorsOptionOpts = { ...DEFAULT_OPTS, ...optsA }
  return { colorsOptionOpts }
}

const validateOpts = function (defaultTheme, opts) {
  validateDefaultTheme(defaultTheme)
  validateBasicOpts(opts)
  validate(opts, { exampleConfig: EXAMPLE_OPTS, recursiveDenylist: ['stream'] })
}

const validateDefaultTheme = function (defaultTheme) {
  if (defaultTheme === undefined || !isPlainObj(defaultTheme)) {
    throw new TypeError('The first argument must be a default theme object')
  }
}

const validateBasicOpts = function (opts) {
  if (!isPlainObj(opts)) {
    throw new TypeError(`Options must be a plain object: ${opts}`)
  }
}

const isDefined = function (key, value) {
  return value !== undefined
}

const DEFAULT_OPTS = {}

const EXAMPLE_OPTS = {
  ...DEFAULT_OPTS,
  stream: stdout,
  colors: true,
}
