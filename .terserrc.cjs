/* eslint-disable @typescript-eslint/no-require-imports */
const terserConfig = require("terser-config-atomic")

module.exports = {
  ...terserConfig,
  format: {
    ...terserConfig.format,
    comments: false,
  },
}
