require('ignore-styles')
require('regenerator-runtime/runtime') // async await 支持
require('@babel/register')({
  presets: [
      '@babel/preset-react',
      '@babel/preset-env',
      '@babel/preset-typescript',
  ],
});
require('./server.js');