import isPlainObj from 'is-plain-obj'

// Normalize options and assign default values
export const getOpts = (defaultTheme, opts = {}) => {
  validateDefaultTheme(defaultTheme)
  validateBasicOpts(opts)
  const { cwd = '.', ...colorsOptionOpts } = opts
  validateCwd(cwd)
  return { cwd, colorsOptionOpts }
}

const validateDefaultTheme = (defaultTheme) => {
  if (defaultTheme === undefined || !isPlainObj(defaultTheme)) {
    throw new TypeError('The first argument must be a default theme object')
  }
}

const validateBasicOpts = (opts) => {
  if (!isPlainObj(opts)) {
    throw new TypeError(`Options must be a plain object: ${opts}`)
  }
}

const validateCwd = (cwd) => {
  if (typeof cwd !== 'string') {
    throw new TypeError(`Option "cwd" must be a string: ${cwd}`)
  }

  if (cwd === '') {
    throw new TypeError('Option "cwd" must not be an empty string')
  }
}
