import test from 'ava'
import hasAnsi from 'has-ansi'
import { each } from 'test-each'

import terminalTheme from '../src/main.js'

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
    'keyword-white',
    'hex-ffffff',
    'rgb-255-255-255',
    'hsl-360-100-100',
    'hsv-360-100-100',
    'hwb-360-100-100',
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
    'bgKeyword-white',
    'bgHex-ffffff',
    'bgRgb-255-255-255',
    'bgHsl-360-100-100',
    'bgHsv-360-100-100',
    'bgHwb-360-100-100',
  ],
  ({ title }, style) => {
    test(`Can apply any styles | ${title}`, async (t) => {
      const { category } = await terminalTheme(
        { category: style },
        { colors: true },
      )
      t.true(hasAnsi(category('test')))
    })
  },
)

test('Can apply any styles | visible', async (t) => {
  const { category } = await terminalTheme(
    { category: 'visible' },
    { colors: false },
  )
  t.is(category('test'), '')
})
