// eslint-disable-next-line import/no-namespace
import * as ansiStyles from 'ansi-styles'

import terminalTheme from '../../src/main.js'

export const getCategory = async function (defaultTheme, opts) {
  const { category } = await terminalTheme(
    { category: 'red', ...defaultTheme },
    { colors: true, ...opts },
  )
  return category
}

export const hasStyle = function (category, style) {
  return category('test').includes(ansiStyles[style].open)
}
