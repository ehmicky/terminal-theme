import { stderr } from 'node:process'

import terminalTheme, {
  type Options,
  type DefaultTheme,
  type Theme,
} from 'terminal-theme'
import { expectType, expectAssignable, expectNotAssignable } from 'tsd'

const defaultTheme = { success: 'red bold' } as const
const theme = await terminalTheme(defaultTheme)

expectAssignable<DefaultTheme>(defaultTheme)
// @ts-expect-error
await terminalTheme()
// @ts-expect-error
await terminalTheme(true)
expectNotAssignable<DefaultTheme>(true)
expectNotAssignable<DefaultTheme>({ success: 'other' })
// @ts-expect-error
await terminalTheme({ success: 'unknown' })

expectType<Theme<typeof defaultTheme>>(theme)
// @ts-expect-error
theme.other

expectType<string>(theme.success('input'))
// @ts-expect-error
theme.success()
// @ts-expect-error
theme.success(true)

await terminalTheme({}, {})
expectAssignable<Options>({})

await terminalTheme({}, { colors: true })
expectAssignable<Options>({ colors: true })
await terminalTheme({}, { colors: undefined })
expectAssignable<Options>({ colors: undefined })
// @ts-expect-error
await terminalTheme({}, { colors: 1 })

await terminalTheme({}, { stream: stderr })
expectAssignable<Options>({ stream: stderr })
// @ts-expect-error
await terminalTheme({}, { stream: true })

await terminalTheme({}, { cwd: '/' })
expectAssignable<Options>({ cwd: '/' })
// @ts-expect-error
await terminalTheme({}, { cwd: true })
