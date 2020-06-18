const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = withCSS(
  withSass({
    distDir: '_next',
    pageExtensions: ['tsx', 'ts'],
    env: {
      BASE_URL: process.env.BASE_URL || 'http://localhost:3000/',
      LOGO_URL: process.env.LOGO_URL || '/logos/catalyst-logo.png',
      LOGO_AUTH_URL:
        process.env.LOGO_AUTH_URL || '/logos/catalist-logo-auth.png',
      BG_AUTH_URL: process.env.BG_AUTH_URL || null,
      BG_DASHBOARD_URL: process.env.BG_DASHBOARD_URL || null,
      BACKEND_URL: process.env.BACKEND_URL || 'http://localhost:5000/',
      FIREBASE_API_KEY:
        process.env.FIREBASE_API_KEY ||
        'AIzaSyCFN4eMkFqIRVR5v9bqyFT70zzQCQoX_d4',
      FIREBASE_AUTH_DOMAIN:
        process.env.FIREBASE_AUTH_DOMAIN ||
        'nextjs-starter-86e34.firebaseapp.com',
      FIREBASE_PROJECTID:
        process.env.FIREBASE_PROJECTID || 'nextjs-starter-86e34',
      FIREBASE_STORAGEBUCKET:
        process.env.FIREBASE_STORAGEBUCKET ||
        'nextjs-starter-86e34.appspot.com',
      FIREBASE_MESSAGINGSENDERID:
        process.env.FIREBASE_MESSAGINGSENDERID || '563001395565',
      FIREBASE_APPID:
        process.env.FIREBASE_APPID ||
        '1:563001395565:web:13075f18cf8e1b18e8f264',
      FACEBOOK_AUTH_ENABLED: process.env.FACEBOOK_AUTH_ENABLED || true,
    },
    webpack: function (cfg) {
      if (cfg.resolve.plugins) {
        cfg.resolve.plugins.push(new TsconfigPathsPlugin());
      } else {
        cfg.resolve.plugins = [new TsconfigPathsPlugin()];
      }
      return cfg;
    },
  }),
);
