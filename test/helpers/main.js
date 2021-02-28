import terminalTheme from '../../src/main.js'

export const getCategory = async function (defaultTheme, opts) {
  const { category } = await terminalTheme(
    { category: 'red', ...defaultTheme },
    { colors: true, ...opts },
  )
  return category
}
