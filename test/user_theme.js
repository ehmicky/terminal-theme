import { promises as fs } from 'fs'
import { platform } from 'process'

import test from 'ava'

import {
  getCategory,
  getCategories,
  hasStyle,
  FIXTURES_DIR,
} from './helpers/main.js'

test('Use user theme', async (t) => {
  const category = await getCategory({}, { fixture: 'success' })
  t.true(hasStyle(category, 'blue'))
})

test('Find user theme in parent directories', async (t) => {
  const category = await getCategory({}, { fixture: 'parent/child' })
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

// `fs.chmod()` does not quite work on Windows
if (platform !== 'win32') {
  test('Handle error while reading user theme', async (t) => {
    const fixtureFile = `${FIXTURES_DIR}/read_error/terminal-theme.yml`
    const { mode } = await fs.stat(fixtureFile)
    await fs.chmod(fixtureFile, 0o000)

    try {
      await t.throwsAsync(getCategory({}, { fixture: 'read_error' }), {
        message: /Could not read/u,
      })
    } finally {
      await fs.chmod(fixtureFile, mode)
    }
  })
}

test('Does not allow invalid YAML in user theme ', async (t) => {
  await t.throwsAsync(getCategory({}, { fixture: 'invalid_yaml' }), {
    message: /Invalid YAML/u,
  })
})
