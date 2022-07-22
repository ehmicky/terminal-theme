<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/ehmicky/design/main/terminal-theme/terminal-theme_dark.svg"/>
  <img alt="terminal-theme logo" src="https://raw.githubusercontent.com/ehmicky/design/main/terminal-theme/terminal-theme.svg" width="500"/>
</picture>

[![Codecov](https://img.shields.io/codecov/c/github/ehmicky/terminal-theme.svg?label=tested&logo=codecov)](https://codecov.io/gh/ehmicky/terminal-theme)
[![Node](https://img.shields.io/node/v/terminal-theme.svg?logo=node.js)](https://www.npmjs.com/package/terminal-theme)
[![TypeScript](https://img.shields.io/badge/-typed-brightgreen?logo=typescript&colorA=gray)](/src/main.d.ts)
[![Twitter](https://img.shields.io/badge/%E2%80%8B-twitter-brightgreen.svg?logo=twitter)](https://twitter.com/intent/follow?screen_name=ehmicky)
[![Medium](https://img.shields.io/badge/%E2%80%8B-medium-brightgreen.svg?logo=medium)](https://medium.com/@ehmicky)

🎨 Use a color theme for your code's terminal output.

A color theme enforces consistency and simplifies updating styles.

Your code specifies the default theme: [styles](#available-styles) and
categories associated to them. Users
[can then optionally override it](#user-theme).

This supports [256 colors, Truecolor](#available-styles) and terminal colors
detection, thanks to [`chalk`](https://github.com/chalk/chalk).

# Example

```js
import terminalTheme from 'terminal-theme'

// Any category/key is possible
const defaultTheme = {
  error: 'red bold',
  success: 'green',
  title: 'white bold',
  // Truecolor is supported
  subtitle: 'rgb-150-100-100',
}
const { error, success, title, subtitle } = await terminalTheme(defaultTheme)
console.log(success('example')) // Print in green color
```

# User theme

Users can override the `defaultTheme` by creating a `terminal-theme.yml` in the
current or any parent directory.

```yml
error: yellow bold
success: cyan
```

Or programmatically:

```js
const { error, success, title, subtitle } = await terminalTheme({
  ...defaultTheme,
  ...userTheme,
})
console.log(success('example'))
```

# Install

```
npm install terminal-theme
```

This package is an ES module and must be loaded using
[an `import` or `import()` statement](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c),
not `require()`.

# API

## terminalTheme(defaultTheme, options?)

`defaultTheme`: `object`\
`options`: `object`\
_Return value_: `Promise<object>`

### defaultTheme

The `defaultTheme` argument is an object where each:

- Key is a category with consistent styles. Examples include `error`, `success`,
  `link`, `header`, etc.
- Value is a space-separated list of [styles](#available-styles). Some styles
  require dash-separated arguments.

```js
const defaultTheme = {
  // Single style, without arguments
  success: 'green',
  // Single style, with arguments
  warning: 'rgb-226-126-26',
  // Multiple styles
  error: 'red bold',
}
```

### Return value

The return value is a promise resolving to an object where each:

- Key is a category defined in the theme.
- Value is a function applying [styles](#available-styles) to a string.

```js
const { error, success } = await terminalTheme({
  error: 'red',
  success: 'green',
})
console.log(success('example'))
```

### options

#### colors

_Type_: `boolean`\
_Default_: `undefined`

Whether colors should be enabled/disabled, regardless of terminal support.
Colors support is automatically detected, so this is only meant to override that
default behavior.

#### stream

_Type_:
[`Stream`](https://nodejs.org/api/stream.html#stream_class_stream_writable)\
_Default_: [`process.stdout`](https://nodejs.org/api/process.html#process_process_stdout)

Stream used to detect colors support. This should be the file or terminal where
the colors are output.

#### cwd

_Type_: `string`\
_Default_: `process.cwd()`

Current directory. Used when [looking for `terminal-theme.yml`](#user-theme).

# Available styles

```sh
# Standard styles
bold underline inverse reset

# Those styles do not always work on Windows
dim italic hidden strikethrough

# Hidden when the terminal does not support colors
visible

# Basic colors
black red green yellow blue magenta cyan white gray
blackBright redBright greenBright yellowBright blueBright
magentaBright cyanBright whiteBright

# Advanced colors
hex-ffffff
rgb-255-255-255

# Background colors
bgBlack bgRed bgGreen bgYellow bgBlue bgMagenta bgCyan bgWhite bgGray
bgBlackBright bgRedBright bgGreenBright bgYellowBright bgBlueBright
bgMagentaBright bgCyanBright bgWhiteBright
bgHex-* bgRgb-*
```

# See also

- [`colors-option`](https://github.com/ehmicky/colors-option): Let users toggle
  colors.

# Support

For any question, _don't hesitate_ to [submit an issue on GitHub](../../issues).

Everyone is welcome regardless of personal background. We enforce a
[Code of conduct](CODE_OF_CONDUCT.md) in order to promote a positive and
inclusive environment.

# Contributing

This project was made with ❤️. The simplest way to give back is by starring and
sharing it online.

If the documentation is unclear or has a typo, please click on the page's `Edit`
button (pencil icon) and suggest a correction.

If you would like to help us fix a bug or add a new feature, please check our
[guidelines](CONTRIBUTING.md). Pull requests are welcome!

<!-- Thanks go to our wonderful contributors: -->

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!--
<table>
  <tr>
    <td align="center"><a href="https://twitter.com/ehmicky"><img src="https://avatars2.githubusercontent.com/u/8136211?v=4?s=100" width="100px;" alt=""/><br /><sub><b>ehmicky</b></sub></a><br /><a href="https://github.com/ehmicky/terminal-theme/commits?author=ehmicky" title="Code">💻</a> <a href="#design-ehmicky" title="Design">🎨</a> <a href="#ideas-ehmicky" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/ehmicky/terminal-theme/commits?author=ehmicky" title="Documentation">📖</a></td>
  </tr>
</table>

-->
<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
