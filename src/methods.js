// Retrieve several chalk methods, e.g. the `chalk.red.bold` function
export const getChalkMethods = function (key, chalk, methods) {
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

  return getArgsChalkMethod({ args, chalkMethod, normalizeArgs })
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
const getArgsChalkMethod = function ({ args, chalkMethod, normalizeArgs }) {
  const argsA = normalizeChalkArgs(normalizeArgs, args)
  return chalkMethod(...argsA)
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
