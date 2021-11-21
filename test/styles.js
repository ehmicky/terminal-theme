import test from 'ava'
import hasAnsi from 'has-ansi'
import { each } from 'test-each'

import { getCategory } from './helpers/main.js'

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
    test(`Can apply any styles | ${title}`, async (t) => {
      const category = await getCategory({ category: style })
      t.true(hasAnsi(category('test')))
    })
  },
)

test('Can apply any styles | visible', async (t) => {
  const category = await getCategory({ category: 'visible' }, { colors: false })
  t.is(category('test'), '')
})
