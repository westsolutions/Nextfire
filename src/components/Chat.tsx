import React from "react";
import {
  Chat,
  Channel,
  ChannelHeader,
  Thread,
  Window
} from "stream-chat-react";
import { MessageList, MessageInput } from "stream-chat-react";
import { StreamChat } from "stream-chat";
import { useAuth } from "reactfire";

const ChatBox = ({ userToken }) => {
  const auth = useAuth();
  const chatClient = new StreamChat(
    "hxewefpgsj8j",
    "rsusyvfkm2wgppvjc4mbpqwt9wvwtg5txqzantj3x4a9tctnrq7ngx5aay6adued"
  );

  chatClient.setUser(
    {
      id: "user-1",
      name: auth.currentUser.displayName,
      image: `https://getstream.io/random_svg/?id=divine-flower-1&name=${auth.currentUser.displayName}`
    },
    userToken
  );

  console.log(auth.currentUser.displayName);

  const channel = chatClient.channel("messaging", "stream-live-chat", {
    // add as many custom fields as you'd like
    image:
      "https://cdn.chrisshort.net/testing-certificate-chains-in-go/GOPHER_MIC_DROP.png",
    name: "Live stream talk"
  });

  return (
    <Chat client={chatClient} theme={"messaging light"}>
      <Channel channel={channel}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};

export default ChatBox;
