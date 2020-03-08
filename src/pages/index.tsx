import React from "react";
import MainLayout from "@layouts/MainLayout";
import Head from "next/head";
import dynamic from "next/dynamic";
import YouTube from "@components/YoutubeIframe";
const ChatBox = dynamic(() => import("@components/Chat"), { ssr: false });
import { StreamChat } from "stream-chat";

function Index({ userToken }) {
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
                  <YouTube youtubeId={process.env.CONTENT_VIDEO_YOUTUBE_ID} />
                  <div className="d-flex justify-content-between align-items-center">
                    <h1>{process.env.CONTENT_VIDEO_TITLE}</h1>
                    <div className="c-live">WE'RE LIVE</div>
                  </div>
                  <p>{process.env.CONTENT_VIDEO_CONTENT}</p>
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
              <div className="c-card">
                <img src={process.env.CONTENT_IMG_1} alt="" />
              </div>
            </div>
            <div className="col-12 col-sm-4">
              <div className="c-card">
                <img src={process.env.CONTENT_IMG_2} alt="" />
              </div>
            </div>
            <div className="col-12 col-sm-4">
              <div className="c-card">
                <img src={process.env.CONTENT_IMG_3} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

Index.getInitialProps = async ctx => {
  const chatClient = new StreamChat(
    process.env.GET_STREAM_PUBLIC,
    process.env.GET_STREAM_SECRET
  );
  const userToken = chatClient.createToken("user-1");
  return { userToken };
};

export default Index;
