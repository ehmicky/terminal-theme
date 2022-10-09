import colorsOption from 'colors-option'

export const chalkString = function (colorsOptionOpts) {
  const chalk = colorsOption(colorsOptionOpts)
  return styleString.bind(undefined, chalk)
}

const styleString = function (chalk, styles, string) {
  if (typeof styles !== 'string') {
    throw new TypeError(`Styles must be a string, not: ${styles}`)
  }

  const chalkMethod = styles
    .trim()
    .split(STYLE_SEPARATOR)
    .reduce(useChalkMethod, chalk)
  return methodWrapper(chalkMethod, string)
}

const STYLE_SEPARATOR = /\s+/u

// Parse a space-separated list of dash-separated methods like:
//   "method otherMethod[-arg-otherArg-...] ..."
const useChalkMethod = function (chalk, style) {
  const [method, ...args] = style.split(ARGS_SEPARATOR)

  if (typeof chalk[method] !== 'function') {
    throw new TypeError(`Style "${style}" is unknown.`)
  }

  const normalizeArgs = ARGS_METHODS[method]
  return normalizeArgs === undefined
    ? getNoArgsChalkMethod(chalk, method, args)
    : getArgsChalkMethod({ chalk, method, args, normalizeArgs })
}

const ARGS_SEPARATOR = '-'

// Chalk method which does not receive any arguments, e.g. `chalk.red(string)`
const getNoArgsChalkMethod = function (chalk, method, args) {
  if (args.length !== 0) {
    throw new TypeError(`No arguments "${args[0]}" allowed with "${method}"`)
  }

  return chalk[method]
}

// Chalk method which receives arguments, e.g. `chalk.rgb(...)(string)`.
// We need to make sure `this` is `chalk` when calling the method.
const getArgsChalkMethod = function ({ chalk, method, args, normalizeArgs }) {
  const argsA = normalizeArgs(args)
  return chalk[method](...argsA)
}

const normalizeNumberArgs = function (args) {
  return args.map(Number)
}

const normalizeIdentityArgs = function (args) {
  return args
}

// Those chalk methods must receive a dash-separated list of arguments
const ARGS_METHODS = {
  rgb: normalizeNumberArgs,
  bgRgb: normalizeNumberArgs,
  hex: normalizeIdentityArgs,
  bgHex: normalizeIdentityArgs,
}

// Wraps chalk method in order to enforce a stricter, more functional signature:
//  - No chaining
//  - No variadic argument
//  - Argument must be a string
const methodWrapper = function (chalkMethod, string) {
  if (typeof string !== 'string') {
    throw new TypeError(`Argument must be a string, not: ${string}`)
  }

  return chalkMethod(string)
}
