import chalkString from 'chalk-string'
import mapObj from 'map-obj'

import { getOpts } from './options.js'
import { applyUserTheme } from './theme.js'

// Thin wrapper around `chalk` which adds support for color theming.
const terminalTheme = async (defaultTheme, opts) => {
  const { cwd, chalkStringOpts } = getOpts(defaultTheme, opts)
  const theme = await applyUserTheme(defaultTheme, cwd)

  if (Object.keys(theme).length === 0) {
    chalkString('reset', chalkStringOpts)
    return {}
  }

  return mapObj(theme, (key, styles) => [
    key,
    chalkString(styles, chalkStringOpts),
  ])
}

export default terminalTheme
