import mapObj from 'map-obj'

// Convert theme object instead an object where each value is a chalk method
export const getThemer = function (theme, chalk) {
  return mapObj(theme, (key, value) => getColor(key, value, chalk))
}

const getColor = function (key, value, chalk) {
  const { method, args } = parseValue(key, value)
  const chalkMethod = getChalkMethod({ key, value, chalk, method, args })
  return [key, chalkMethod]
}

// Parse a dash-separated string "method[-arg-otherArg-...]"
const parseValue = function (key, value) {
  if (typeof value !== 'string') {
    throw new TypeError(`Theme "${key}" must be a string, not ${value}`)
  }

  const [method, ...args] = value.split(ARGS_SEPARATOR)
  return { method, args }
}

const ARGS_SEPARATOR = '-'

const getChalkMethod = function ({ key, value, chalk, method, args }) {
  const chalkMethod = chalk[method]

  if (typeof chalkMethod !== 'function') {
    throw new TypeError(`In theme "${key}": "${value}" is not valid`)
  }

  const chalkMethodA = chalkMethod.bind(chalk)

  const normalizeArgs = ARGS_METHODS[method]

  if (normalizeArgs === undefined) {
    return getNoArgsChalkMethod({
      key,
      method,
      args,
      chalkMethod: chalkMethodA,
    })
  }

  return getArgsChalkMethod({
    args,
    chalk,
    chalkMethod: chalkMethodA,
    normalizeArgs,
  })
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
