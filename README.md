## copy-file-webpack-plugin

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ahyiru/copy-file-webpack-plugin/blob/develop/LICENSE)
[![npm version](https://img.shields.io/npm/v/@huxy/copy-file-webpack-plugin.svg)](https://www.npmjs.com/package/@huxy/copy-file-webpack-plugin)
[![Build Status](https://api.travis-ci.com/ahyiru/copy-file-webpack-plugin.svg?branch=master)](https://app.travis-ci.com/github/ahyiru/copy-file-webpack-plugin)
[![](https://img.shields.io/badge/blog-ihuxy-blue.svg)](http://ihuxy.com/)

webpack 构建完拷贝文件插件。

```js
const CopyFileWebpackPlugin = require('@huxy/copy-file-webpack-plugin');

new CopyFileWebpackPlugin([{from:'../public/src',to:'../app/build/src'}]),

```

配置参数见 [fs-extra](https://www.npmjs.com/package/fs-extra)。