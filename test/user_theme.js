import test from 'ava'

import { getCategory, getCategories, hasStyle } from './helpers/main.js'

test('Use user theme', async (t) => {
  const category = await getCategory({}, { fixture: 'success' })
  t.true(hasStyle(category, 'blue'))
})

test('Shallow merge user theme', async (t) => {
  const { otherCategory } = await getCategories(
    { otherCategory: 'red' },
    { fixture: 'success' },
  )
  t.true(hasStyle(otherCategory, 'red'))
})

test('Allow .yaml extension', async (t) => {
  const category = await getCategory({}, { fixture: 'yaml' })
  t.true(hasStyle(category, 'blue'))
})
