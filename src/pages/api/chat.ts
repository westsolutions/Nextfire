const { parse } = require("url");
const StreamChat = require("stream-chat").StreamChat;

export default (req, res) => {
  const parsedUrl = parse(req.url, true);
  const { pathname, query } = parsedUrl;

  const chatClient = new StreamChat(
    process.env.GET_STREAM_PUBLIC,
    process.env.GET_STREAM_SECRET
  );

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ token: chatClient.createToken(query.user) }));
};
