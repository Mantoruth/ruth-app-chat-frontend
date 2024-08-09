module.exports = {
  // Basic configuration
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',

  // Linting
  lintOnSave: true,

  // Development server
  devServer: {
    port: 8080,
    hot: true,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },

  // CSS
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/styles/_variables.scss";
          @import "@/assets/styles/_mixins.scss";
        `
      }
    }
  },

  // Webpack
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  },

  // Babel
  transpileDependencies: [
    /\bcue\b/
  ]
}