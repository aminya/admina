// From `is-admin`: changed `node:proces` with `process` so that the code works on Deno and Node 12

// cspell:disable

import process from "process"
import execa from "execa"

// https://stackoverflow.com/a/28268802
async function testFltmc() {
  try {
    await execa("fltmc")
    return true
  } catch {
    return false
  }
}

export default async function isAdmin() {
  if (process.platform !== "win32") {
    return false
  }

  try {
    // https://stackoverflow.com/a/21295806/1641422
    await execa("fsutil", ["dirty", "query", process.env.systemdrive ?? ""])
    return true
  } catch (error) {
    if ((error as { code?: string }).code === "ENOENT") {
      return testFltmc()
    }

    return false
  }
}