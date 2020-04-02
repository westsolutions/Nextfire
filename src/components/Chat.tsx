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

const ChatBox = ({ userToken, userId, image, name }) => {
  const auth = useAuth();
  const chatClient = new StreamChat(
    process.env.GET_STREAM_PUBLIC,
    process.env.GET_STREAM_SECRET
  );
  let channel = null;
  if (userId) {
    chatClient.setUser(
      {
        id: userId,
        name: auth?.currentUser?.displayName,
        image: `https://getstream.io/random_svg/?name=${auth?.currentUser?.displayName}`,
        role: "GUEST"
      },
      userToken
    );

    channel = chatClient.channel("messaging", process.env.CONTENT_CHAT_ID, {
      image,
      name
    });

    channel.addMembers([userId]);
  }

  return (
    <>
      {userId && (
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
      )}
    </>
  );
};

export default ChatBox;
