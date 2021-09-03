## copy-file-webpack-plugin

webpack 构建完拷贝文件插件。

```js
const CopyFileWebpackPlugin = require('@huxy/copy-file-webpack-plugin');

new CopyFileWebpackPlugin([{from:'../public/src',to:'../app/build/src'}]),

```

配置参数见 [open](https://www.npmjs.com/package/fs-extra)。