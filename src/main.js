import colorsOption from 'colors-option'

import { getOpts } from './options.js'
import { getThemer } from './themer.js'
import { applyUserTheme } from './user_theme.js'

// Thin wrapper around `chalk` which adds support for color theming.
const terminalTheme = async function (defaultTheme, opts) {
  const { defaultTheme: defaultThemeA, colorsOptionOpts, cwd } = getOpts(
    defaultTheme,
    opts,
  )
  const chalk = colorsOption(colorsOptionOpts)
  const theme = await applyUserTheme(defaultThemeA, cwd)
  const themer = getThemer(theme, chalk)
  return themer
}

// We do not use `export default` because Babel transpiles it in a way that
// requires CommonJS users to `require(...).default` instead of `require(...)`.
module.exports = terminalTheme
