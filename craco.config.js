const path = require('path')

module.exports = {
  webpack: {
    alias: {
      '@layouts': path.resolve(__dirname, 'src/layouts'),
      '@context': path.resolve(__dirname, 'src/context'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@style': path.resolve(__dirname, 'src/style'),
      '@commonTypes': path.resolve(__dirname, 'src/types'),
      '@assets': path.resolve(__dirname, 'src/assets'),
    },
    resolve: {
      fallback: {
        buffer: false,
      },
    },
  },
}
