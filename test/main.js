import test from 'ava'
import hasAnsi from 'has-ansi'
import { each } from 'test-each'

import terminalTheme from '../src/main.js'

each(['red'], ({ title }, style) => {
  test(`Can apply any styles | ${title}`, async (t) => {
    const { category } = await terminalTheme(
      { category: style },
      { colors: true },
    )
    t.true(hasAnsi(category('test')))
  })
})
