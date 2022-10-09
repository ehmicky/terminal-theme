import chalkString from 'chalk-string'
import mapObj from 'map-obj'

import { getOpts } from './options.js'
import { applyUserTheme } from './theme.js'

// Thin wrapper around `chalk` which adds support for color theming.
export default async function terminalTheme(defaultTheme, opts) {
  const { cwd, colorsOptionOpts } = getOpts(defaultTheme, opts)
  const addStyles = chalkString(colorsOptionOpts)
  const theme = await applyUserTheme(defaultTheme, cwd)
  const themer = getThemer(theme, addStyles)
  return themer
}

const getThemer = function (theme, addStyles) {
  return mapObj(theme, (key, styles) => [key, getMethod(styles, addStyles)])
}

const getMethod = function (styles, addStyles) {
  const method = addStyles.bind(undefined, styles)
  method('')
  return method
}
