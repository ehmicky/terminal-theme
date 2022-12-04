import test from 'ava'
import { each } from 'test-each'

import terminalTheme from 'terminal-theme'

each(
  [
    [],
    ['red'],
    [{}, true],
    [{}, { colors: 0 }],
    [{}, { stream: true }],
    [{}, { cwd: true }],
    [{}, { cwd: '' }],
  ],
  ({ title }, [defaultTheme, opts]) => {
    test(`Validate options | ${title}`, async (t) => {
      await t.throwsAsync(terminalTheme(defaultTheme, opts))
    })
  },
)
