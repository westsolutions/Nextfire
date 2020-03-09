var express = require("express");
var app = express();
var dotenv = require("dotenv");
var StreamChat = require("stream-chat").StreamChat;
var cors = require("cors");

dotenv.config();

app.use(cors());

var chatClient = new StreamChat(
  process.env.GET_STREAM_PUBLIC,
  process.env.GET_STREAM_SECRET
);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running on port ${process.env.SERVER_PORT}`);
});

app.get("/chat", (req, res, next) => {
  res.json(chatClient.createToken(req.query.user));
});
