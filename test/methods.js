import ansiStyles from 'ansi-styles'
import test from 'ava'
import hasAnsi from 'has-ansi'
import { each } from 'test-each'

// eslint-disable-next-line no-restricted-imports
import { chalkString } from '../src/methods.js'

const chalk = chalkString({ colors: true })
const noColorsChalk = chalkString({ colors: false })

const hasStyle = function (string, style) {
  return string.includes(ansiStyles[style].open)
}

test('Can apply single styles without arguments', (t) => {
  t.true(hasStyle(chalk('red', 'test'), 'red'))
})

test('Can apply "visible" styles', (t) => {
  t.is(noColorsChalk('visible', 'test'), '')
})

each(
  [
    'bold',
    'underline',
    'inverse',
    'reset',
    'dim',
    'italic',
    'hidden',
    'strikethrough',
    'black',
    'red',
    'green',
    'yellow',
    'blue',
    'magenta',
    'cyan',
    'white',
    'gray',
    'blackBright',
    'redBright',
    'greenBright',
    'yellowBright',
    'blueBright',
    'magentaBright',
    'cyanBright',
    'whiteBright',
    'hex-ffffff',
    'rgb-255-255-255',
    'bgBlack',
    'bgRed',
    'bgGreen',
    'bgYellow',
    'bgBlue',
    'bgMagenta',
    'bgCyan',
    'bgWhite',
    'bgGray',
    'bgBlackBright',
    'bgRedBright',
    'bgGreenBright',
    'bgYellowBright',
    'bgBlueBright',
    'bgMagentaBright',
    'bgCyanBright',
    'bgWhiteBright',
    'bgHex-ffffff',
    'bgRgb-255-255-255',
  ],
  ({ title }, style) => {
    test(`Can apply any styles | ${title}`, (t) => {
      t.true(hasAnsi(chalk(style, 'test')))
    })
  },
)

test('Can apply multiple styles', (t) => {
  const string = chalk('red bold', 'test')
  t.true(hasStyle(string, 'red'))
  t.true(hasStyle(string, 'bold'))
})

test('Trim style', (t) => {
  t.true(hasStyle(chalk(' red ', 'test'), 'red'))
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
