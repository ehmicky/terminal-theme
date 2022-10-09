import ansiStyles from 'ansi-styles'
import test from 'ava'

// eslint-disable-next-line no-restricted-imports
import { chalkString } from '../src/methods.js'

const hasStyle = function (string, style) {
  return string.includes(ansiStyles[style].open)
}

const chalk = chalkString({ colors: true })

test('Trim style', (t) => {
  t.true(hasStyle(chalk(' red ', 'test'), 'red'))
})

test('Can apply multiple styles', (t) => {
  const string = chalk('red bold', 'test')
  t.true(hasStyle(string, 'red'))
  t.true(hasStyle(string, 'bold'))
})

test('Does not allow non-existing styles', (t) => {
  t.throws(() => chalk('doesNotExist', 'test'), { message: /is unknown/u })
})

test('Does not allow non-string styles', (t) => {
  t.throws(() => chalk(true, 'test'), { message: /must be a string/u })
})

test('Does not allow arguments with some styles', (t) => {
  t.throws(() => chalk('red-255', 'test'), { message: /No arguments/u })
})

test('Ignores multiple arguments', (t) => {
  t.false(chalk('red', 'one', 'two').includes('two'))
})

test('Does not allow non-string arguments', (t) => {
  t.throws(() => chalk('red'), { message: /Argument must be a string/u })
})
