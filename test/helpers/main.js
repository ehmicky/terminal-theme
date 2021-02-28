// eslint-disable-next-line import/no-namespace
import * as ansiStyles from 'ansi-styles'

import terminalTheme from '../../src/main.js'

const FIXTURES_DIR = `${__dirname}/../fixtures`

export const getCategory = async function (
  defaultTheme,
  { fixture, ...opts } = {},
) {
  const cwd = fixture === undefined ? undefined : `${FIXTURES_DIR}/${fixture}`
  const { category } = await terminalTheme(
    { category: 'red', ...defaultTheme },
    { colors: true, cwd, ...opts },
  )
  return category
}

export const hasStyle = function (category, style) {
  return category('test').includes(ansiStyles[style].open)
}
