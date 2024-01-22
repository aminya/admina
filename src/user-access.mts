import { isSudo, execRoot, defaultExecOptions } from "./root.mjs"
import fs from "fs"

/**
 * Give the user access to the given path (and its sub-directories if a directory). It changes the owner to the
 * SUDO_USER. This allows the user to use the folder without sudo
 *
 * @param path The path to give the user access to
 */
export async function grantUserWriteAccess(path: string) {
  if (
    (process.platform === "linux" || process.platform === "darwin") &&
    isSudo() &&
    process.env.SUDO_USER !== undefined
  ) {
    const isDirectory = fs.statSync(path).isDirectory()
    await execRoot("chown", [...(isDirectory ? ["-R"] : []), process.env.SUDO_USER, path], defaultExecOptions)
  }
}
