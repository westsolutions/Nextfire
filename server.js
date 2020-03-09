const express = require("express");
const dotenv = require("dotenv");
const StreamChat = require("stream-chat").StreamChat;
const cors = require("cors");
const next = require("next");
const path = require("path");
const { createServer } = require("http");
const { parse } = require("url");

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 4000;

dotenv.config();

var chatClient = new StreamChat(
  process.env.GET_STREAM_PUBLIC,
  process.env.GET_STREAM_SECRET
);

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    if (pathname === "/chat") {
      res.end(chatClient.createToken(query.user));
    } else {
      handle(req, res, parsedUrl);
    }
  }).listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
