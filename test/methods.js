import test from 'ava'
import { each } from 'test-each'

import { getCategory } from './helpers/main.js'

each(['doesNotExist', 'red-255', true], ({ title }, style) => {
  test(`Throws on invalid styles | ${title}`, async (t) => {
    await t.throwsAsync(getCategory({ category: style }))
  })
})

test('Ignores multiple arguments', async (t) => {
  const category = await getCategory()
  t.false(category('one', 'two').includes('two'))
})

test('Does not allow non-string arguments', async (t) => {
  const category = await getCategory()
  t.throws(() => category())
})

test('Does not allow chaining', async (t) => {
  const category = await getCategory()
  t.throws(() => category.bold('test'))
})
