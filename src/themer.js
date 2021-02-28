import mapObj from 'map-obj'

// Convert theme object instead an object where each value is a chalk method
export const getThemer = function (theme, chalk) {
  return mapObj(theme, (key, value) => getColor(key, value, chalk))
}

const getColor = function (key, value, chalk) {
  const methods = parseValue(key, value)
  const chalkMethods = getChalkMethods(key, chalk, methods)
  return [key, chalkMethods]
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

const getChalkMethods = function (key, chalk, methods) {
  return methods
    .reduce(
      (chalkA, { method, args, input }) =>
        getChalkMethod({ key, chalk: chalkA, method, args, input }),
      chalk,
    )
    .bind(chalk)
}

const getChalkMethod = function ({ key, chalk, method, args, input }) {
  const chalkMethod = chalk[method]

  if (typeof chalkMethod !== 'function') {
    throw new TypeError(`In theme "${key}": "${input}" is not valid`)
  }

  const normalizeArgs = ARGS_METHODS[method]

  if (normalizeArgs === undefined) {
    return getNoArgsChalkMethod({ key, method, args, chalkMethod })
  }

  return getArgsChalkMethod({ args, chalk, chalkMethod, normalizeArgs })
}

// Chalk method which does not receive any arguments, e.g. `chalk.red(string)`
const getNoArgsChalkMethod = function ({ key, method, args, chalkMethod }) {
  if (args.length !== 0) {
    throw new TypeError(
      `In theme "${key}": no arguments "${args[0]}" allowed with "${method}"`,
    )
  }

  return chalkMethod
}

// Chalk method which receives arguments, e.g. `chalk.keyword('red')(string)`
const getArgsChalkMethod = function ({
  args,
  chalk,
  chalkMethod,
  normalizeArgs,
}) {
  const argsA = normalizeChalkArgs(normalizeArgs, args)
  return chalkMethod(...argsA).bind(chalk)
}

const normalizeChalkArgs = function (normalizeArgs, args) {
  return normalizeArgs === false ? args : normalizeArgs(args)
}

const normalizeNumberArgs = function (args) {
  return args.map(Number)
}

// Those chalk methods must receive a dash-separated list of arguments
const ARGS_METHODS = {
  ansi: normalizeNumberArgs,
  ansi256: normalizeNumberArgs,
  apple: normalizeNumberArgs,
  cmyk: normalizeNumberArgs,
  hcg: normalizeNumberArgs,
  hsl: normalizeNumberArgs,
  hsv: normalizeNumberArgs,
  hwb: normalizeNumberArgs,
  lab: normalizeNumberArgs,
  lch: normalizeNumberArgs,
  rgb: normalizeNumberArgs,
  xyz: normalizeNumberArgs,
  hex: false,
  keyword: false,
}
