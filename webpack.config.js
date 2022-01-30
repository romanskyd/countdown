let path = require( 'path' )

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve( __dirname, 'src' ),
    }
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  // plugin omitted
}