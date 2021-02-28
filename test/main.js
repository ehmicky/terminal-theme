import { stderr } from 'process'

import test from 'ava'

import { getCategory, hasStyle } from './helpers/main.js'

test('Can specify "colors" option', async (t) => {
  const category = await getCategory({}, { colors: false })
  t.false(hasStyle(category, 'red'))
})

test('Can specify "stream" option', async (t) => {
  const category = await getCategory({}, { stream: stderr })
  t.true(hasStyle(category, 'red'))
})
