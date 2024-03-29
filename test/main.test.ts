import { remove } from "fs-extra"
import { execRoot, execRootSync } from "../dist/root.mjs"
import { grantUserWriteAccess } from "../dist/user-access.mjs"
import { writeFile } from "fs/promises"
import tempy from "tempy"
import { join } from "path"

describe("admina", function () {
  let tempDir: string

  beforeAll(() => {
    tempDir = tempy.directory()
  })

  it("execaRoot", async () => {
    if (process.platform === "linux" || process.platform === "darwin") {
      const file = join(tempDir, "test rm")
      await writeFile(file, "test rm")

      await execRoot("rm", [file])
    }
  })

  it("execaRootSync", async () => {
    if (process.platform === "linux" || process.platform === "darwin") {
      const file = join(tempDir, "test rm")
      await writeFile(file, "test rm")

      execRootSync("rm", [file])
    }
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
