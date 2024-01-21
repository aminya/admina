import { default as isAdminWindowsOrig } from "./is-admin.mjs"
import { isRoot } from "./root.mjs"

/**
 * Check if the process is running as administrator on Windows.
 *
 * @example
 *
 * ```js
 * import { isAdminWindows } from "admina"
 *
 * console.log(await isAdminWindows())
 * //=> false
 * ```
 *
 * @returns Whether the process is running as administrator.
 */
export const isAdminWindows = isAdminWindowsOrig

/**
 * Detect if the process has root privilege on Posix.
 *
 * @example
 *
 * ```js
 * import { isAdminPosix } from "admina"
 *
 * console.log(isAdminPosix())
 * //=> false
 * ```
 *
 * @returns Whether the process is running as root.
 */
export const isAdminPosix = isRoot

/**
 * Detect if the code is running as admin/root
 *
 * On Windows, it checks for admin access, and on Posix, it checks for root access
 *
 * @example
 *
 * ```js
 * import { isAdmin } from "admina"
 *
 * console.log(isAdmin())
 * //=> false
 * ```
 *
 * @returns Whether the process is running as root or admin.
 */
export function isAdmin() {
  if (process.platform === "win32") {
    return isAdminWindows()
  } else {
    return isRoot()
  }
}
