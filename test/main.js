import { stderr } from 'node:process'

import test from 'ava'

import { getCategory, hasStyle } from './helpers/main.js'

test('Can apply styles', async (t) => {
  const category = await getCategory({ category: 'red' })
  t.true(hasStyle(category, 'red'))
})

test('Validate styles', async (t) => {
  await t.throwsAsync(getCategory({ category: 'unknown' }))
})

test('Can specify "colors" option', async (t) => {
  const category = await getCategory({}, { colors: false })
  t.false(hasStyle(category, 'red'))
})

test('Can specify "stream" option', async (t) => {
  const category = await getCategory({}, { stream: stderr })
  t.true(hasStyle(category, 'red'))
})
