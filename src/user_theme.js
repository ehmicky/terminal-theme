import { readFile } from 'fs/promises'

import { excludeKeys } from 'filter-obj'
import { findUp } from 'find-up'
import { load as loadYaml, JSON_SCHEMA } from 'js-yaml'

// Users can override theme by specifying a `terminal-theme.yml` in the current
// directory or any parent directory.
// The file is intentionally not namespaced per application, so users can re-use
// consistent theming across applications, providing they use the same keys.
export const applyUserTheme = async function (defaultTheme, cwd) {
  const userTheme = await getUserTheme(cwd)
  const userThemeA = excludeKeys(
    userTheme,
    (key) => defaultTheme[key] === undefined,
  )
  return { ...defaultTheme, ...userThemeA }
}

const getUserTheme = async function (cwd) {
  const userThemePath = await findUp(USER_THEME_FILES, { cwd })

  if (userThemePath === undefined) {
    return {}
  }

  const userThemeContent = await getUserThemeContent(userThemePath)
  const userTheme = parseUserTheme(userThemeContent, userThemePath)
  return userTheme
}

const USER_THEME_FILES = ['terminal-theme.yml', 'terminal-theme.yaml']

const getUserThemeContent = async function (userThemePath) {
  try {
    return await readFile(userThemePath, 'utf8')
  } catch (error) {
    throw new Error(`Could not read "${userThemePath}"\n${error.message}`)
  }
}

const parseUserTheme = function (userThemeContent, userThemePath) {
  try {
    return loadYaml(userThemeContent, {
      schema: JSON_SCHEMA,
      json: true,
      onWarning,
    })
  } catch (error) {
    throw new Error(`Invalid YAML in "${userThemePath}"\n${error.message}`)
  }
}

const onWarning = function (error) {
  throw error
}
