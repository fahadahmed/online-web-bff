import path from 'path';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';

import pkg from '../package.json';

const external = [].concat(Object.keys(pkg.dependencies || {}), 'path');

export default [
  {
    input: path.resolve(__dirname, '../src/index.ts'),
    plugins: [
      json(),
      typescript({
        tsconfig: path.resolve(__dirname, '../tsconfig.json'),
        module: 'es6',
      }),
    ],
    external,
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
      },
    ],
  },
];
