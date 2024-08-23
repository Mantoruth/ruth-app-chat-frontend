const path = require('path');
const webpack = require('webpack'); // Import Webpack

module.exports = {
  outputDir: path.resolve(__dirname, 'dist'),
  publicPath: '/',
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false), // Define the feature flag
      }),
    ],
  },
  devServer: {
    port: 8080,
  },
};
