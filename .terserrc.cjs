const terserConfig = require("terser-config-atomic")

module.exports = {
  ...terserConfig,
  format: {
    ...terserConfig.format,
    comments: false,
  },
}
