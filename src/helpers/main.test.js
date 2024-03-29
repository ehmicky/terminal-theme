import { fileURLToPath } from 'node:url'

import ansiStyles from 'ansi-styles'

import terminalTheme from 'terminal-theme'

export const FIXTURES_DIR = fileURLToPath(
  new URL('../fixtures', import.meta.url),
)

export const getCategory = async (defaultTheme, opts) => {
  const { category } = await getCategories(defaultTheme, opts)
  return category
}

export const getCategories = async (
  defaultTheme,
  { fixture, ...opts } = {},
) => {
  const cwd = fixture === undefined ? undefined : `${FIXTURES_DIR}/${fixture}`
  return await terminalTheme(
    { category: 'red', ...defaultTheme },
    { colors: true, cwd, ...opts },
  )
}

export const hasStyle = (category, style) =>
  category('test').includes(ansiStyles[style].open)
