import colorsOption from 'colors-option'

import { getOpts } from './options.js'
import { getThemer } from './themer.js'
import { applyUserTheme } from './user_theme.js'

// Thin wrapper around `chalk` which adds support for color theming.
const colorsTheme = async function (defaultTheme, opts) {
  const { colorsOptionOpts, cwd } = getOpts(defaultTheme, opts)
  const chalk = colorsOption(colorsOptionOpts)
  const theme = await applyUserTheme(defaultTheme, cwd)
  const themer = getThemer(theme, chalk)
  return themer
}

// We do not use `export default` because Babel transpiles it in a way that
// requires CommonJS users to `require(...).default` instead of `require(...)`.
module.exports = colorsTheme
