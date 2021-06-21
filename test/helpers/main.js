import { fileURLToPath } from 'url'

import ansiStyles from 'ansi-styles'
import terminalTheme from 'terminal-theme'

export const FIXTURES_DIR = fileURLToPath(
  new URL('../fixtures', import.meta.url),
)

export const getCategory = async function (defaultTheme, opts) {
  const { category } = await getCategories(defaultTheme, opts)
  return category
}

export const getCategories = async function (
  defaultTheme,
  { fixture, ...opts } = {},
) {
  const cwd = fixture === undefined ? undefined : `${FIXTURES_DIR}/${fixture}`
  return await terminalTheme(
    { category: 'red', ...defaultTheme },
    { colors: true, cwd, ...opts },
  )
}

export const hasStyle = function (category, style) {
  return category('test').includes(ansiStyles[style].open)
}
