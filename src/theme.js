import { readFile } from 'node:fs/promises'

import { excludeKeys } from 'filter-obj'
import { findUp } from 'find-up'
import { JSON_SCHEMA, load as loadYaml } from 'js-yaml'

// Users can override theme by specifying a `terminal-theme.yml` in the current
// directory or any parent directory.
// The file is intentionally not namespaced per application, so users can re-use
// consistent theming across applications, providing they use the same keys.
export const applyUserTheme = async (defaultTheme, cwd) => {
  const defaultThemeA = excludeKeys(defaultTheme, isUndefined)
  const userTheme = await getUserTheme(cwd)
  const userThemeA = excludeKeys(
    userTheme,
    (key) => defaultThemeA[key] === undefined,
  )
  return { ...defaultThemeA, ...userThemeA }
}

const isUndefined = (key, value) => value === undefined

const getUserTheme = async (cwd) => {
  const userThemePath = await findUp(USER_THEME_FILES, { cwd })

  if (userThemePath === undefined) {
    return {}
  }

  const userThemeContent = await getUserThemeContent(userThemePath)
  const userTheme = parseUserTheme(userThemeContent, userThemePath)
  return userTheme
}

const USER_THEME_FILES = ['terminal-theme.yml', 'terminal-theme.yaml']

const getUserThemeContent = async (userThemePath) => {
  try {
    return await readFile(userThemePath, 'utf8')
  } catch (error) {
    throw new Error(`Could not read "${userThemePath}"\n${error.message}`)
  }
}

const parseUserTheme = (userThemeContent, userThemePath) => {
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

const onWarning = (error) => {
  throw error
}
