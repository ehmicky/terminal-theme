import {
  expectType,
  expectAssignable,
  expectNotAssignable,
  expectError,
} from 'tsd'

import terminalTheme, { Options, DefaultTheme, Theme } from './main.js'

const defaultTheme = { success: 'red bold' } as const
const theme = await terminalTheme(defaultTheme)

expectAssignable<DefaultTheme>(defaultTheme)
expectError(terminalTheme())
expectError(terminalTheme(true))
expectNotAssignable<DefaultTheme>(true)
expectNotAssignable<DefaultTheme>({ success: 'other' })
expectError(terminalTheme({ success: 'unknown' }))

expectType<Theme<typeof defaultTheme>>(theme)
const { success } = theme
expectError(theme.other)

expectType<string>(success('input'))
expectError(success())
expectError(success(true))

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
