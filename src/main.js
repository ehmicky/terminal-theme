import colorsOption from 'colors-option'

import { getOpts } from './options.js'

// Thin wrapper around `chalk which adds support for color theming.
const colorsTheme = function (theme, opts) {
  const { colorsOptionOpts } = getOpts(theme, opts)
  const chalk = colorsOption(colorsOptionOpts)
  const themer = getThemer(theme, chalk)
  return themer
}

// We do not use `export default` because Babel transpiles it in a way that
// requires CommonJS users to `require(...).default` instead of `require(...)`.
module.exports = colorsTheme
