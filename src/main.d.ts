import type chalkString from 'chalk-string'
import type { Options as ChalkStringOptions, Styles } from 'chalk-string'

export interface Options {
  /**
   * Whether colors should be enabled/disabled, regardless of terminal
   * support.  Colors support is automatically detected, so this is only meant
   * to override that default behavior.
   *
   * @default undefined
   */
  readonly colors?: ChalkStringOptions['colors']

  /**
   * Stream used to detect colors support.
   * This should be the file or terminal where the colors are output.
   *
   * @default process.stdout
   */
  readonly stream?: ChalkStringOptions['stream']

  /**
   * Current directory. Used when looking for `terminal-theme.yml`.
   *
   * @default '.'
   */
  readonly cwd?: string
}

/**
 * Object where each:
 *  - Key is a category with consistent styles.
 *    Examples include `error`, `success`, `link`, `header`, etc.
 *  - Value is a space-separated list of styles.
 *    Some styles require dash-separated arguments.
 *
 * @example
 * ```js
 * const defaultTheme = {
 *   // Single style, without arguments
 *   success: 'green',
 *   // Single style, with arguments
 *   warning: 'rgb-226-126-26',
 *   // Multiple styles
 *   error: 'red bold',
 * }
 * ```
 */
export interface DefaultTheme {
  readonly [category: string]: Styles
}

/**
 * Object where each:
 *  - Key is a category defined in the theme.
 *  - Value is a function applying styles to a string.
 *
 * @example
 * ```js
 * const { error, success } = await terminalTheme({
 *   error: 'red',
 *   success: 'green',
 * })
 * console.log(success('example'))
 * ```
 */
export type Theme<ChosenDefaultTheme extends DefaultTheme> = {
  readonly [category in keyof ChosenDefaultTheme]: (
    input: Parameters<ReturnType<typeof chalkString>>[1],
  ) => ReturnType<ReturnType<typeof chalkString>>
}

/**
 * Use a color theme for your code's terminal output.
 * A color theme enforces consistency and simplifies updating styles.
 * Your code specifies the default theme: styles and categories associated to
 * them. Users can then optionally override it.
 *
 * @example
 * ```js
 * // Any category/key is possible
 * const defaultTheme = {
 *   error: 'red bold',
 *   success: 'green',
 *   title: 'white bold',
 *   // Truecolor is supported
 *   subtitle: 'rgb-150-100-100',
 * }
 * const { error, success, title, subtitle } = await terminalTheme(defaultTheme)
 * console.log(success('example')) // Print in green color
 * ```
 */
export default function terminalTheme<ChosenDefaultTheme extends DefaultTheme>(
  defaultTheme: ChosenDefaultTheme,
  options?: Options,
): Promise<Theme<ChosenDefaultTheme>>
