import test from 'ava'
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
    [{}, { cwd: '' }],
  ],
  ({ title }, [defaultTheme, opts]) => {
    test(`Validate options | ${title}`, async (t) => {
      await t.throwsAsync(terminalTheme(defaultTheme, opts))
    })
  },
)
