const path = require('path')

module.exports = {
  mode: 'production',
  entry: { index: './src/index.ts', legacy: './src/legacy/index.ts' },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'commonjs'
  },
  externals: {
    '@vue/runtime-core': '@vue/runtime-core',
    redux: 'redux'
  }
}
