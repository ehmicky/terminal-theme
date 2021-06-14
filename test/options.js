import test from 'ava'
// eslint-disable-next-line import/no-unresolved, node/no-missing-import
import terminalTheme from 'terminal-theme'
import { each } from 'test-each'

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
