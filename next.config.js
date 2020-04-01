const withCSS = require("@zeit/next-css");
const withSass = require("@zeit/next-sass");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = withCSS(
  withSass({
    env: {
      BASE_URL: process.env.BASE_URL || "http://localhost:3000/",
      LOGO_URL: process.env.LOGO_URL || "/logos/catalyst-logo.png",
      LOGO_AUTH_URL: process.env.LOGO_URL || "/logos/catalist-logo-auth.png",
      BG_AUTH_URL: process.env.BG_AUTH_URL || null,
      BG_DASHBOARD_URL: process.env.BG_DASHBOARD_URL || null,
      BACKEND_URL: process.env.BACKEND_URL || "http://localhost:5000/",
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
      CONTENT_CHAT_ID: process.env.CONTENT_CHAT_ID || "test",
      CONTENT_CHAT_AVATAR:
        process.env.CONTENT_CHAT_AVATAR ||
        "https://cdn.chrisshort.net/testing-certificate-chains-in-go/GOPHER_MIC_DROP.png",
      CONTENT_CHAT_ENABLED: process.env.CONTENT_CHAT_ENABLED,
      CONTENT_IMG: process.env.CONTENT_IMG,
      CONTENT_IMG_HREF: process.env.CONTENT_IMG_HREF,
      FIREBASE_API_KEY:
        process.env.FIREBASE_API_KEY ||
        "AIzaSyBb0--6EL3IyFtvA08t9akw8frWBggZzyQ",
      FIREBASE_AUTH_DOMAIN:
        process.env.FIREBASE_AUTH_DOMAIN || "tribesocial-a13fb.firebaseapp.com",
      FIREBASE_DATABASE_URL:
        process.env.FIREBASE_DATABASE_URL ||
        "https://tribesocial-a13fb.firebaseio.com",
      FIREBASE_PROJECTID: process.env.FIREBASE_PROJECTID || "tribesocial-a13fb",
      FIREBASE_STORAGEBUCKET:
        process.env.FIREBASE_STORAGEBUCKET || "tribesocial-a13fb.appspot.com",
      FIREBASE_MESSAGINGSENDERID:
        process.env.FIREBASE_MESSAGINGSENDERID || "736494109878",
      FIREBASE_APPID:
        process.env.FIREBASE_APPID ||
        "1:736494109878:web:dac83729db2ddfe78d5217",
      CONTENT_JWT_NAME: process.env.CONTENT_JWT_NAME || "tribe_social",
      CONTENT_JWT_SECRET:
        process.env.CONTENT_JWT_SECRET ||
        "RL8cqhtmJ8qyDIk0FNv_gmInUjJ4VFdHODNha2wxZG5rd04wYzJlRk5WY0hCblpHdFkn",
      CONTENT_JWT_SOURCE:
        process.env.CONTENT_JWT_SOURCE ||
        "https://cdn.jwplayer.com/v2/playlists/n8OU0HJb, https://cdn.jwplayer.com/v2/playlists/yYYotlJD",
      ACCESS_CODE: process.env.ACCESS_CODE || "CATWEST20"
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
