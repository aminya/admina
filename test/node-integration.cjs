/* eslint-disable @typescript-eslint/no-require-imports */

const admina = require("../dist/index.node.cjs")
const { isAdmin, isSudo } = admina

isAdmin()
isSudo()
