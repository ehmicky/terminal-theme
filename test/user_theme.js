import test from 'ava'

import { getCategory, hasStyle } from './helpers/main.js'

test('Trim style', async (t) => {
  const category = await getCategory(
    { category: 'red' },
    { fixture: 'success' },
  )
  t.true(hasStyle(category, 'blue'))
})
