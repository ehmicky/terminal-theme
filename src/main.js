import mapObj from 'map-obj'

import { chalkString } from './methods.js'
import { getOpts } from './options.js'
import { applyUserTheme } from './theme.js'

// Thin wrapper around `chalk` which adds support for color theming.
export default async function terminalTheme(defaultTheme, opts) {
  const { cwd, colorsOptionOpts } = getOpts(defaultTheme, opts)
  const chalk = chalkString(colorsOptionOpts)
  const theme = await applyUserTheme(defaultTheme, cwd)
  const themer = getThemer(theme, chalk)
  return themer
}

const getThemer = function (theme, chalk) {
  return mapObj(theme, (key, styles) => [key, getMethod(styles, chalk)])
}

const getMethod = function (styles, chalk) {
  const method = chalk.bind(undefined, styles)
  method('')
  return method
}
