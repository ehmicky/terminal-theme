import colorsOption from 'colors-option'

import { getOpts } from './options.js'
import { getThemer } from './themer.js'
import { applyUserTheme } from './user_theme.js'

// Thin wrapper around `chalk` which adds support for color theming.
export default async function terminalTheme(defaultTheme, opts) {
  const { cwd, colorsOptionOpts } = getOpts(defaultTheme, opts)
  const chalk = colorsOption(colorsOptionOpts)
  const theme = await applyUserTheme(defaultTheme, cwd)
  const themer = getThemer(theme, chalk)
  return themer
}
