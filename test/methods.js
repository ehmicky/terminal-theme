import test from 'ava'
import { each } from 'test-each'

import terminalTheme from '../src/main.js'

each(['doesNotExist', 'red-255', true], ({ title }, style) => {
  test(`Throws on invalid styles | ${title}`, async (t) => {
    await t.throwsAsync(terminalTheme(style))
  })
})

test('Ignores multiple arguments', async (t) => {
  const { category } = await terminalTheme(
    { category: 'red' },
    { colors: true },
  )
  t.false(category('one', 'two').includes('two'))
})

test('Does not allow non-string arguments', async (t) => {
  const { category } = await terminalTheme(
    { category: 'red' },
    { colors: true },
  )
  t.throws(() => category())
})

test('Does not allow chaining', async (t) => {
  const { category } = await terminalTheme(
    { category: 'red' },
    { colors: true },
  )
  t.throws(() => category.bold('test'))
})
