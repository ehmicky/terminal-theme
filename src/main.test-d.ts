import { expectType, expectAssignable, expectNotAssignable } from 'tsd'

import terminalTheme, { Options, DefaultTheme, Theme } from 'terminal-theme'

const defaultTheme = { success: 'red bold' } as const
const theme = await terminalTheme(defaultTheme)

expectAssignable<DefaultTheme>(defaultTheme)
// @ts-expect-error
terminalTheme()
// @ts-expect-error
terminalTheme(true)
expectNotAssignable<DefaultTheme>(true)
expectNotAssignable<DefaultTheme>({ success: 'other' })
// @ts-expect-error
terminalTheme({ success: 'unknown' })

expectType<Theme<typeof defaultTheme>>(theme)
const { success } = theme
// @ts-expect-error
theme.other

expectType<string>(success('input'))
// @ts-expect-error
success()
// @ts-expect-error
success(true)

terminalTheme({}, {})
expectAssignable<Options>({})

terminalTheme({}, { colors: true })
expectAssignable<Options>({ colors: true })
terminalTheme({}, { colors: undefined })
expectAssignable<Options>({ colors: undefined })
// @ts-expect-error
terminalTheme({}, { colors: 1 })

terminalTheme({}, { stream: process.stderr })
expectAssignable<Options>({ stream: process.stderr })
// @ts-expect-error
terminalTheme({}, { stream: true })

terminalTheme({}, { cwd: '/' })
expectAssignable<Options>({ cwd: '/' })
// @ts-expect-error
terminalTheme({}, { cwd: true })
