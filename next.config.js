const withCSS = require("@zeit/next-css");
const withSass = require("@zeit/next-sass");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = withCSS(
  withSass({
    env: {
      BASE_URL: process.env.BASE_URL || "http://localhost:3000/",
      LOGO_URL: process.env.LOGO_URL || "/logos/logo.png"
    },
    webpack: function(cfg) {
      if (cfg.resolve.plugins) {
        cfg.resolve.plugins.push(new TsconfigPathsPlugin());
      } else {
        cfg.resolve.plugins = [new TsconfigPathsPlugin()];
      }
      return cfg;
    }
  })
);
