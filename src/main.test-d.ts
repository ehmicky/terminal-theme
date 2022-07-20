import {
  expectType,
  expectAssignable,
  expectNotAssignable,
  expectError,
} from 'tsd'

import terminalTheme, {
  Options,
  Styles,
  DefaultTheme,
  Theme,
} from './main.js'

const defaultTheme = { success: 'red' } as const
const theme = await terminalTheme(defaultTheme)

expectAssignable<DefaultTheme>(defaultTheme)
expectError(terminalTheme())
expectError(terminalTheme(true))
expectNotAssignable<DefaultTheme>(true)
expectNotAssignable<DefaultTheme>({ success: 'other' })

expectType<Theme<typeof defaultTheme>>(theme)
const { success } = theme
expectError(theme.other)

expectType<string>(success('input'))
expectError(success())
expectError(success(true))

expectAssignable<Styles>('red')
expectAssignable<Styles>('red blue')
expectAssignable<Styles>('bold')
expectAssignable<Styles>('redBright')
expectAssignable<Styles>('bgRed')
expectAssignable<Styles>('bgRedBright')
expectAssignable<Styles>('hex-ffffff')
expectAssignable<Styles>('bgHex-ffffff')
expectAssignable<Styles>('rgb-10-10-10')
expectAssignable<Styles>('bgRgb-10-10-10')
expectNotAssignable<Styles>('other')
expectNotAssignable<Styles>('hex')
expectNotAssignable<Styles>('rgb-a-a-a')
expectNotAssignable<Styles>('rgb-10-10')

terminalTheme({}, {})
expectAssignable<Options>({})

terminalTheme({}, { colors: true })
expectAssignable<Options>({ colors: true })
terminalTheme({}, { colors: undefined })
expectAssignable<Options>({ colors: undefined })
expectError(terminalTheme({}, { colors: 1 }))

terminalTheme({}, { stream: process.stderr })
expectAssignable<Options>({ stream: process.stderr })
expectError(terminalTheme({}, { stream: true }))

terminalTheme({}, { cwd: '/' })
expectAssignable<Options>({ cwd: '/' })
expectError(terminalTheme({}, { cwd: true }))
