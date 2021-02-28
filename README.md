[![Codecov](https://img.shields.io/codecov/c/github/ehmicky/colors-theme.svg?label=tested&logo=codecov)](https://codecov.io/gh/ehmicky/colors-theme)
[![Build](https://github.com/ehmicky/colors-theme/workflows/Build/badge.svg)](https://github.com/ehmicky/colors-theme/actions)
[![Node](https://img.shields.io/node/v/colors-theme.svg?logo=node.js)](https://www.npmjs.com/package/colors-theme)
[![Gitter](https://img.shields.io/gitter/room/ehmicky/colors-theme.svg?logo=gitter)](https://gitter.im/ehmicky/colors-theme)
[![Twitter](https://img.shields.io/badge/%E2%80%8B-twitter-4cc61e.svg?logo=twitter)](https://twitter.com/intent/follow?screen_name=ehmicky)
[![Medium](https://img.shields.io/badge/%E2%80%8B-medium-4cc61e.svg?logo=medium)](https://medium.com/@ehmicky)

Custom color themes for terminal output.

TODO

# Example

```js
const colorsTheme = require('colors-theme')

const defaultTheme = {
  error: 'red bold',
  warning: 'yellow',
  success: 'green',
}

const exampleLibrary = async function ({ theme }) {
  const { error, warning, success } = await colorsTheme(defaultTheme)
  // Print in green color
  console.log(success('example'))
}
```

Users can override themes using a `colors-theme.yml` in the current or any
parent directory:

```yml
error: yellow bold
success: cyan
```

# Install

```
npm install colors-theme
```

# API

## colorsTheme(defaultTheme, options?)

`defaultTheme`: `object`\
`options`: `object`\
_Return value_: `Promise<object>`

### Return value

TODO

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

Current directory. Used when looking for `colors-theme.yml`.

# Support

If you found a bug or would like a new feature, _don't hesitate_ to
[submit an issue on GitHub](../../issues).

For other questions, feel free to
[chat with us on Gitter](https://gitter.im/ehmicky/colors-option).

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
    <td align="center"><a href="https://twitter.com/ehmicky"><img src="https://avatars2.githubusercontent.com/u/8136211?v=4?s=100" width="100px;" alt=""/><br /><sub><b>ehmicky</b></sub></a><br /><a href="https://github.com/ehmicky/colors-option/commits?author=ehmicky" title="Code">💻</a> <a href="#design-ehmicky" title="Design">🎨</a> <a href="#ideas-ehmicky" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/ehmicky/colors-option/commits?author=ehmicky" title="Documentation">📖</a></td>
  </tr>
</table>

-->
<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
