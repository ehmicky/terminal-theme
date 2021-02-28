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
