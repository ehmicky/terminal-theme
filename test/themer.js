import { modifier, color } from 'ansi-styles'
import test from 'ava'

import { getCategory } from './helpers/main.js'

test('Trim style', async (t) => {
  const category = await getCategory({ category: ' red ' })
  t.true(category('test').includes(color.red.open))
})

test('Can apply multiple styles', async (t) => {
  const category = await getCategory({ category: 'red  bold' })
  t.true(category('test').includes(color.red.open))
  t.true(category('test').includes(modifier.bold.open))
})
