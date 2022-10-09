import test from 'ava'

import { getCategory, hasStyle } from './helpers/main.js'

test('Trim style', async (t) => {
  const category = await getCategory({ category: ' red ' })
  t.true(hasStyle(category, 'red'))
})

test('Can apply multiple styles', async (t) => {
  const category = await getCategory({ category: 'red  bold' })
  t.true(hasStyle(category, 'red'))
  t.true(hasStyle(category, 'bold'))
})

test('Does not allow non-existing styles', async (t) => {
  await t.throwsAsync(getCategory({ category: 'doesNotExist' }), {
    message: /is unknown/u,
  })
})

test('Does not allow non-string styles', async (t) => {
  await t.throwsAsync(getCategory({ category: true }), {
    message: /must be a string/u,
  })
})

test('Does not allow arguments with some styles', async (t) => {
  await t.throwsAsync(getCategory({ category: 'red-255' }), {
    message: /No arguments/u,
  })
})

test('Ignores multiple arguments', async (t) => {
  const category = await getCategory()
  t.false(category('one', 'two').includes('two'))
})

test('Does not allow non-string arguments', async (t) => {
  const category = await getCategory()
  t.throws(() => category(), { message: /Argument must be a string/u })
})

test('Does not allow chaining', async (t) => {
  const category = await getCategory()
  t.throws(() => category.bold('test'), { message: /is not a function/u })
})
