const express = require("express");
const dotenv = require("dotenv");
const StreamChat = require("stream-chat").StreamChat;
const cors = require("cors");
const next = require("next");
const path = require("path");
const url = require("url");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 4000;

dotenv.config();

var chatClient = new StreamChat(
  process.env.GET_STREAM_PUBLIC,
  process.env.GET_STREAM_SECRET
);

if (!dev && cluster.isMaster) {
  console.log(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.error(
      `Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`
    );
  });
} else {
  const nextApp = next({ dir: ".", dev });
  const nextHandler = nextApp.getRequestHandler();

  nextApp.prepare().then(() => {
    const server = express();
    server.use(cors());

    if (!dev) {
      // Enforce SSL & HSTS in production
      server.use(function(req, res, next) {
        var proto = req.headers["x-forwarded-proto"];
        if (proto === "https") {
          res.set({
            "Strict-Transport-Security": "max-age=31557600" // one-year
          });
          return next();
        }
        res.redirect("https://" + req.headers.host + req.url);
      });
    }

    // Static files
    // https://github.com/zeit/next.js/tree/4.2.3#user-content-static-file-serving-eg-images
    server.use(
      "/static",
      express.static(path.join(__dirname, "static"), {
        maxAge: dev ? "0" : "365d"
      })
    );

    server.get("/chat", (req, res, next) => {
      console.log("xxxx");
      res.json(chatClient.createToken(req.query.user));
    });

    // Default catch-all renders Next app
    server.get("*", (req, res) => {
      const parsedUrl = url.parse(req.url, true);
      nextHandler(req, res, parsedUrl);
    });

    server.listen(port, err => {
      if (err) throw err;
      console.log(`Listening on http://localhost:${port}`);
    });
  });
}
