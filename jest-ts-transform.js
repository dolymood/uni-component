// clone @sucrase/jest-plugin
// fixed by dolymood to support jsxPragma
var path = require("path");
var _sucrase = require("sucrase");

function getTransforms(filename) {
  if (filename.endsWith(".js") || filename.endsWith(".jsx")) {
    return ["flow", "jsx", "imports", "jest"];
  } else if (filename.endsWith(".ts")) {
    return ["typescript", "imports", "jest"];
  } else if (filename.endsWith(".tsx")) {
    return ["typescript", "jsx", "imports", "jest"];
  }
  return null;
}

const jsxPragmaMap = {
  core: "h",
  vue: "proxyh"
};

function process(src, filename) {
  const transforms = getTransforms(filename);
  if (transforms !== null) {
    const options = {
      transforms,
      sourceMapOptions: {compiledFilename: filename},
      filePath: filename,
    }
    if (transforms.includes('jsx')) {
      const relativePath = path.relative(__dirname, filename);
      const match = relativePath.match(/packages\/([^/]+)\//);
      if (match && jsxPragmaMap[match[1]]) {
        options.jsxPragma = jsxPragmaMap[match[1]]
      }
    }
    const {code, sourceMap} = _sucrase.transform.call(void 0, src, options);
    const mapBase64 = Buffer.from(JSON.stringify(sourceMap)).toString("base64");
    const suffix = `//# sourceMappingURL=data:application/json;charset=utf-8;base64,${mapBase64}`;
    return `${code}\n${suffix}`;
  } else {
    return src;
  }
}
module.exports = {
  process: process
};
