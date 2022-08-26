import which from "which"
import execa from "execa"

/** Detect if sudo is available and the user has root privileges */
export function isSudo(): boolean {
  return (Boolean(process.env.CI) || isRoot()) && which.sync("sudo", { nothrow: true }) !== null
}

