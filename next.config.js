const withCSS = require("@zeit/next-css");
const withSass = require("@zeit/next-sass");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = withCSS(
  withSass({
    env: {
      BASE_URL: process.env.BASE_URL || "http://localhost:3000/",
      LOGO_URL: process.env.LOGO_URL || "/logos/logo.png",
      GET_STREAM_PUBLIC: process.env.GET_STREAM_PUBLIC || "hxewefpgsj8j",
      GET_STREAM_SECRET:
        process.env.GET_STREAM_SECRET ||
        "rsusyvfkm2wgppvjc4mbpqwt9wvwtg5txqzantj3x4a9tctnrq7ngx5aay6adued",
      CONTENT_VIDEO_YOUTUBE_ID:
        process.env.CONTENT_VIDEO_YOUTUBE_ID || "NvqKZHpKs-g",
      CONTENT_VIDEO_TITLE: process.env.CONTENT_VIDEO_TITLE || "VIDEO TITLE",
      CONTENT_VIDEO_CONTENT:
        process.env.CONTENT_VIDEO_CONTENT ||
        "asdfasdfasdfasdfasdfasdfasdfasdfasdf asdfasdfasdfasdfasdfasdfasdfasdfasdf asdfasdfasdfasdfasdfasdfasdfasdfasdf",
      CONTENT_CHAT_TITLE: process.env.CONTENT_CHAT_TITLE || "CHAT title",
      CONTENT_CHAT_AVATAR:
        process.env.CONTENT_CHAT_AVATAR ||
        "https://cdn.chrisshort.net/testing-certificate-chains-in-go/GOPHER_MIC_DROP.png",
      CONTENT_IMG_1:
        process.env.CONTENT_IMG_1 || "https://dummyimage.com/640x4:3",
      CONTENT_IMG_2:
        process.env.CONTENT_IMG_2 || "https://dummyimage.com/640x4:3",
      CONTENT_IMG_3:
        process.env.CONTENT_IMG_3 || "https://dummyimage.com/640x4:3"
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
