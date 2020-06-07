import React, { useEffect, useState } from "react";
import { useAuth } from "reactfire";
import MainLayout from "@layouts/MainLayout";
import Head from "next/head";
import VideoList from "@components/Video/VideoList";
import VideoPlayer from "@components/Video/VideoPlayer";
import Ads from "@components/Ads/Ads";
import classNames from "classnames";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const ChatBox = dynamic(() => import("@components/Chat"), { ssr: false });
import fetch from "isomorphic-fetch";

function VideoPage({ source }) {
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserName] = useState(null);
  const auth = useAuth();

  const fetchUserToken = async currentUser => {
    await fetch(`${process.env.BASE_URL}api/chat?user=${currentUser.uid}`)
      .then(response => response.json())
      .then(res => {
        setUserToken(res.token);
        setUserName(currentUser.uid);
      });
  };

  useEffect(() => {
    auth.onAuthStateChanged((currentUser: any) => {
      if (process.env.CONTENT_CHAT_ENABLED && currentUser) {
        fetchUserToken(currentUser);
      }
    });
  }, []);

  const router = useRouter();
  const { playlist, videoId } = router.query;
  const sourcePlaylist = source.find(source => source.feedid === playlist)
    .playlist;
  const [id, videoIndex] = (videoId as string).split("__");
  const videoItem = sourcePlaylist.find(i => i.mediaid === id);
  const videoColumnClass = classNames({
    "col-12": true,
    "col-sm-8": process.env.CONTENT_CHAT_ENABLED
  });
  const hasNext = Number(videoIndex) < sourcePlaylist.length - 1;
  const mediaIdsList = sourcePlaylist.map(pl => pl.mediaid);
  const indexOfNext = Number(videoIndex) + 1;

  const redirectLink =
    indexOfNext < sourcePlaylist.length - 1
      ? `/${playlist}/${mediaIdsList[indexOfNext]}__${indexOfNext}/`
      : "/";
  return (
    <MainLayout>
      <Head>
        <title>Live Stream Event | Tribe</title>
      </Head>
      <div className="s-video-single container">
        <div className="row">
          <div className={videoColumnClass}>
            {videoItem && (
              <VideoPlayer
                subTitle={source.title}
                title={videoItem.title}
                videoItem={videoItem}
                hasNext={hasNext}
                redirectLink={redirectLink}
              />
            )}
          </div>
          {process.env.CONTENT_CHAT_ENABLED && userToken && (
            <div className="col-12 col-md-4">
              <div className="c-chat">
                <ChatBox
                  userToken={userToken}
                  userId={userId}
                  image={process.env.CONTENT_CHAT_AVATAR}
                  name={process.env.CONTENT_CHAT_TITLE}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <Ads />
      <VideoList playlist={sourcePlaylist} title="Up Next" excludedId={id} />
    </MainLayout>
  );
}

VideoPage.getInitialProps = async ({}) => {
  if (!process.env.CONTENT_JWT_SOURCE) {
    return {
      source: []
    };
  }
  let sources = process.env.CONTENT_JWT_SOURCE.split(", ");
  let results = await Promise.all(
    sources.map(source => fetch(source).then(response => response.json()))
  );
  return {
    source: results.map(result => result)
  };
};

export default VideoPage;
