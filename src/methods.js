// Retrieve several chalk methods, e.g. the `chalk.red.bold` function
export const getChalkMethod = function (key, chalk, methods) {
  const chalkMethod = methods.reduce(
    (chalkA, { method, args, input }) =>
      addChalkMethod({ key, chalk: chalkA, method, args, input }),
    chalk,
  )
  return methodWrapper.bind(chalk, chalkMethod)
}

const addChalkMethod = function ({ key, chalk, method, args, input }) {
  if (typeof chalk[method] !== 'function') {
    throw new TypeError(`In theme "${key}": "${input}" is not valid`)
  }

  const normalizeArgs = ARGS_METHODS[method]

  if (normalizeArgs === undefined) {
    return getNoArgsChalkMethod({ key, chalk, method, args })
  }

  return getArgsChalkMethod({ args, chalk, method, normalizeArgs })
}

// Chalk method which does not receive any arguments, e.g. `chalk.red(string)`
const getNoArgsChalkMethod = function ({ key, chalk, method, args }) {
  if (args.length !== 0) {
    throw new TypeError(
      `In theme "${key}": no arguments "${args[0]}" allowed with "${method}"`,
    )
  }

  return chalk[method]
}

// Chalk method which receives arguments, e.g. `chalk.rgb(...)(string)`.
// We need to make sure `this` is `chalk` when calling the method.
const getArgsChalkMethod = function ({ args, chalk, method, normalizeArgs }) {
  const argsA = normalizeChalkArgs(normalizeArgs, args)
  return chalk[method](...argsA)
}

const normalizeChalkArgs = function (normalizeArgs, args) {
  return normalizeArgs === false ? args : normalizeArgs(args)
}

const normalizeNumberArgs = function (args) {
  return args.map(Number)
}

// Those chalk methods must receive a dash-separated list of arguments
const ARGS_METHODS = {
  rgb: normalizeNumberArgs,
  bgRgb: normalizeNumberArgs,
  hex: false,
  bgHex: false,
}

// Wraps chalk method in order to enforce a stricter, more functional signature:
//  - No chaining
//  - No variadic argument
//  - Argument must be a string
const methodWrapper = function (chalkMethod, string) {
  if (typeof string !== 'string') {
    throw new TypeError(`Argument must be a string, not ${string}`)
  }

  return chalkMethod(string)
}
