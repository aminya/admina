import { remove } from "fs-extra"
import { execRoot, execRootSync } from "../dist/root.mjs"
import { grantUserWriteAccess } from "../dist/user-access.mjs"
import { writeFile } from "fs/promises"
import tempy from "tempy"
import { join } from "path"

describe("admina", () => {
  let tempDir: string

  beforeAll(() => {
    tempDir = tempy.directory()
  })

  it("execaRoot Unix", async () => {
    if (process.platform === "win32") {
      return
    }
    const file = join(tempDir, "test rm")
    await writeFile(file, "test rm")

    await execRoot("rm", [file])
  })

  it("execRoot node --version", async () => {
    const result = await execRoot("node", ["--version"])
    expect(result.exitCode).toBe(0)
  })

  it("execaRootSync Unix", async () => {
    if (process.platform === "win32") {
      return
    }
    const file = join(tempDir, "test rm")
    await writeFile(file, "test rm")

    execRootSync("rm", [file])
  })

  it("execRootSync node --version", () => {
    const result = execRootSync("node", ["--version"])
    expect(result.exitCode).toBe(0)
  })

  it("execRootSync does not double-quote already-quoted args", () => {
    const result = execRootSync("node", ['"--version"'])
    expect(result.exitCode).toBe(0)
  })

  it("admina.grantUserWriteAccess", async () => {
    const file = join(tempDir, "chown test")
    await writeFile(file, "chown test")

    await grantUserWriteAccess(file)
    await grantUserWriteAccess(tempDir)
  })

  afterAll(async () => {
    await remove(tempDir)
  })
})
