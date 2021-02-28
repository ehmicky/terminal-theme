import mapObj from 'map-obj'

import { getChalkMethod } from './methods.js'

// Convert theme object instead an object where each value is a chalk method
export const getThemer = function (theme, chalk) {
  return mapObj(theme, (key, value) => getColor(key, value, chalk))
}

const getColor = function (key, value, chalk) {
  const methods = parseValue(key, value)
  const chalkMethod = getChalkMethod(key, chalk, methods)
  return [key, chalkMethod]
}

// Parse a space-separated list of dash-separated methods like:
//   "method otherMethod[-arg-otherArg-...] ..."
const parseValue = function (key, value) {
  if (typeof value !== 'string') {
    throw new TypeError(`Theme "${key}" must be a string, not ${value}`)
  }

  return value.trim().split(METHODS_SEPARATOR).map(parseRawMethod)
}

const METHODS_SEPARATOR = /\s+/u

const parseRawMethod = function (input) {
  const [method, ...args] = input.split(ARGS_SEPARATOR)
  return { method, args, input }
}

const ARGS_SEPARATOR = '-'
