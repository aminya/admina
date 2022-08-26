import { default as isAdminWindowsOrig } from "is-admin"
import { isRoot } from "./root"

export const isAdminWindows = isAdminWindowsOrig

/**
 * Detect if the code is running as admin/root
 *
 * On Windows, it checks for admin access, and on Posix, it checks for root access
 */
export function isAdmin() {
  if (process.platform === "win32") {
    return isAdminWindows()
  } else {
    return isRoot()
  }
}
