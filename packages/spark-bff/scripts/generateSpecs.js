const fs = require('fs');
const path = require('path');
const swaggerToTS = require('openapi-typescript');
const camelcase = require('camelcase');

const prettierConfig = path.resolve(__dirname, '../../../.prettierrc');

const srcDir = path.resolve(__dirname, '../openapi-specs');
const dstDir = path.resolve(__dirname, '../src/generated/typings');
fs.mkdirSync(dstDir, { recursive: true });

const files = fs.readdirSync(srcDir);

files.forEach((fileName) => {
  const input = JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname, '../openapi-specs', fileName),
      'utf8',
    ),
  );
  const output = swaggerToTS.default(input, {
    prettierConfig,
  });

  const nameWithoutExtension = fileName.split(/[.|-]/)[0];
  fs.writeFileSync(`${dstDir}/${camelcase(nameWithoutExtension)}.ts`, output);
});
