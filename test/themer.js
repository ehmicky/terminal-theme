import { modifier, color } from 'ansi-styles'
import test from 'ava'

import terminalTheme from '../src/main.js'

test('Trim style', async (t) => {
  const { category } = await terminalTheme(
    { category: ' red ' },
    { colors: true },
  )
  t.true(category('test').includes(color.red.open))
})

test('Can apply multiple styles', async (t) => {
  const { category } = await terminalTheme(
    { category: 'red  bold' },
    { colors: true },
  )
  t.true(category('test').includes(color.red.open))
  t.true(category('test').includes(modifier.bold.open))
})
