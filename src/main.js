import colorsOption from 'colors-option'

import { getOpts } from './options.js'
import { getThemer } from './themer.js'
import { applyUserTheme } from './user_theme.js'

// Thin wrapper around `chalk which adds support for color theming.
const colorsTheme = async function (theme, opts) {
  const { colorsOptionOpts } = getOpts(theme, opts)
  const chalk = colorsOption(colorsOptionOpts)
  const themeA = await applyUserTheme(theme)
  const themer = getThemer(themeA, chalk)
  return themer
}

// We do not use `export default` because Babel transpiles it in a way that
// requires CommonJS users to `require(...).default` instead of `require(...)`.
module.exports = colorsTheme
