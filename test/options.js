import test from 'ava'
import { each } from 'test-each'

import terminalTheme from '../src/main.js'

each(
  [
    [],
    ['red'],
    [{}, true],
    [{}, { colors: 0 }],
    [{}, { stream: true }],
    [{}, { cwd: true }],
  ],
  ({ title }, [defaultTheme, opts]) => {
    test(`Validate options | ${title}`, async (t) => {
      await t.throwsAsync(terminalTheme(defaultTheme, opts))
    })
  },
)
