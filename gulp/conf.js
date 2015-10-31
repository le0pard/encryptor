module.exports = {
  js: {
    src: [
      'src/**/*.js',
      'webpack/*.js'
    ]
  },
  jsx: {
    src: ['src/**/*.jsx']
  },
  dist: {
    assets:       './src/assets/**/*',
    assetsDest:   './dist/assets',
    electron:     './electron/*',
    electronDest: './dist'
  }
}
