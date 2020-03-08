import React from "react";
import MainLayout from "@layouts/MainLayout";
import Head from "next/head";
import dynamic from "next/dynamic";
import YouTube from "@components/YoutubeIframe";
const ChatBox = dynamic(() => import("@components/Chat"), { ssr: false });
import { StreamChat } from "stream-chat";

function Index({ userToken }) {
  // const auth = useAuth();
  return (
    <MainLayout>
      <Head>
        <title>Welcome</title>
      </Head>
      <div className="s-video">
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-8">
              <div className="c-video">
                <div className="c-video__content">
                  <YouTube youtubeId={"NvqKZHpKs-g"} />
                  <div className="d-flex justify-content-between align-items-center">
                    <h1>Video title</h1>
                    <div className="c-live">WE'RE LIVE</div>
                  </div>

                  <p>
                    asdfasdfasdfasdfasdfasdfasdfasdfasdf
                    asdfasdfasdfasdfasdfasdfasdfasdfasdf
                    asdfasdfasdfasdfasdfasdfasdfasdfasdf
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-4">
              <ChatBox userToken={userToken} />
            </div>
          </div>
        </div>
      </div>
      <div className="s-card">
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-4">
              <div className="c-card"></div>
            </div>
            <div className="col-12 col-sm-4">
              <div className="c-card"></div>
            </div>
            <div className="col-12 col-sm-4">
              <div className="c-card"></div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

Index.getInitialProps = async ctx => {
  // const auth = useAuth();
  // debugger;
  const chatClient = new StreamChat(
    "hxewefpgsj8j",
    "rsusyvfkm2wgppvjc4mbpqwt9wvwtg5txqzantj3x4a9tctnrq7ngx5aay6adued"
  );
  const userToken = chatClient.createToken("user-1");
  // console.log({ chatClient, userToken });
  return { userToken };
};

export default Index;
