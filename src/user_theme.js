import { promises as fs } from 'fs'

import filterObj from 'filter-obj'
import findUp from 'find-up'
import { load as loadYaml, JSON_SCHEMA } from 'js-yaml'

// Users can override theme by specifying a `colors-theme.yml` in the current
// directory or any parent directory.
// The file is intentionally not namespaced per application, so users can re-use
// consistent theming across applications, providing they use the same keys.
export const applyUserTheme = async function (theme, cwd) {
  const userTheme = await getUserTheme(cwd)
  const userThemeA = filterObj(userTheme, (key) => theme[key] !== undefined)
  return { ...theme, ...userThemeA }
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

const USER_THEME_FILES = ['colors-theme.yml', 'colors-theme.yaml']

const getUserThemeContent = async function (userThemePath) {
  try {
    return await fs.readFile(userThemePath, 'utf8')
  } catch (error) {
    throw new Error(`Could not read "${userThemePath}": ${error.message}`)
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
