const path = require('path')

const webpackConfigBase = {
  //module此处为loader区域，一般文件内容解析，处理放在此处，如babel，less,postcss转换等
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json", "less"],
    alias: {
      '@': path.resolve(__dirname, '../client')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-react',
            ],
            plugins: [
              ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
            ]
          }
        }
      },
      {
        test: [/\.ts$/, /\.tsx$/],
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              // presets: [
              //   '@babel/preset-env',
              //   '@babel/preset-react',
              //   '@babel/preset-typescript'
              // ],
              presets: ["@babel/env", "@babel/react", '@babel/preset-typescript'],
              plugins: [
                ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }],
                ["@babel/plugin-proposal-class-properties"]
              ]
            }
          }]
      },
      {
        test: [/\.css$/, /\.less$/],
        exclude: [/[\\/]node_modules[\\/].*antd/],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              // parser: 'postcss-strip-inline-comments',
              ident: 'postcss',
              plugins: (loader) => [
                require('autoprefixer')()
              ],
            }
          },
          {
            loader: 'less-loader',
          },
        ]
      },
      {
        test: [/\.css$/, /\.less$/],
        include: [/[\\/]node_modules[\\/].*antd/],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: false
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|jpeg|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // limit: 120000,
              // name: 'img/[name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  } 
}

module.exports = webpackConfigBase;
