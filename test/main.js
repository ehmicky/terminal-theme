import test from 'ava'

import { getCategory, hasStyle } from './helpers/main.js'

test('Can specify "colors" option', async (t) => {
  const category = await getCategory({}, { colors: false })
  t.false(hasStyle(category, 'red'))
})
