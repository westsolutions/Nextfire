const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = withCSS(
  withSass({
    pageExtensions: ['tsx', 'ts'],
    env: {
      NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
      NEXT_PUBLIC_LOGO_URL: process.env.NEXT_PUBLIC_LOGO_URL,
      NEXT_PUBLIC_LOGO_AUTH_URL:
        process.env.NEXT_PUBLIC_LOGO_AUTH_URL,
      NEXT_PUBLIC_BG_AUTH_URL: process.env.NEXT_PUBLIC_BG_AUTH_URL,
      NEXT_PUBLIC_BG_DASHBOARD_URL: process.env.NEXT_PUBLIC_BG_DASHBOARD_URL,
      NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
      NEXT_PUBLIC_FIREBASE_API_KEY:
        process.env.NEXT_PUBLIC_FIREBASE_API_KEY,

      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:
        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      NEXT_PUBLIC_FIREBASE_PROJECTID:
        process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
      NEXT_PUBLIC_FIREBASE_STORAGEBUCKET:
        process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
      NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID:
        process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
      NEXT_PUBLIC_FIREBASE_APPID:
        process.env.NEXT_PUBLIC_FIREBASE_APPID,
      NEXT_PUBLIC_FACEBOOK_AUTH_ENABLED: process.env.NEXT_PUBLIC_FACEBOOK_AUTH_ENABLED,
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
