const path = require('path')

module.exports = {
  webpack: {
    alias: {
      '@layouts': path.resolve(__dirname, 'src/shared/layouts'),
      '@context': path.resolve(__dirname, 'src/shared/context'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@constants': path.resolve(__dirname, 'src/shared/constants'),
      '@helpers': path.resolve(__dirname, 'src/shared/helpers'),
      '@queries': path.resolve(__dirname, 'src/shared/queries'),
      '@api': path.resolve(__dirname, 'src/shared/api'),
      '@style': path.resolve(__dirname, 'src/shared/style'),
      '@commonTypes': path.resolve(__dirname, 'src/shared/types'),
      '@assets': path.resolve(__dirname, 'src/shared/assets'),
    },
    resolve: {
      fallback: {
        buffer: false,
      },
    },
  },
}
