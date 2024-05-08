const path = require('path');
const slsw = require('serverless-webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
// const FFMpegBinary = require('ffmpeg-static'); // Import ffmpeg-static

console.log('ENTRIES', slsw.lib.entries);

module.exports = {
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  entry: slsw.lib.entries,
  resolve: {
    extensions: ['.ts', 'tsx', '.js'],
    // alias: {
    // 'ffmpeg-static': FFMpegBinary,
    // },
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.(tsx?)$/,
        use: [
          {
            loader: 'ts-loader',
            // options: {
            //   transpileOnly: true,
            // },
          },
        ],
        // loader: 'ts-loader',
        exclude: [
          [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, '.serverless'),
            path.resolve(__dirname, '.webpack'),
          ],
        ],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        'joiny-app-9005334c7266.json',
        'joiny-app-aaf8070596.json',
        'joiny_apple_private_key.p8',
        'joiny_apple_private_key_in_app.p8',
        'joiny_cloudfront_key.pem',
        'screenshot.jpeg',
        // FFMpegBinary,
      ],
    }),
  ],
  externals: {
    'ffmpeg-static': true,
    '@prisma/client': true,
    prisma: true,
    superagent: true,
    'firebase-admin': true,
  },
};
