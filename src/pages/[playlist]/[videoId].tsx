import React, { useEffect, useState } from "react";
import { useAuth } from "reactfire";
import MainLayout from "@layouts/MainLayout";
import Head from "next/head";
import axios from "axios";
import VideoList from "@components/Video/VideoList";
import VideoPlayer from "@components/Video/VideoPlayer";
import Ads from "@components/Ads/Ads";
import classNames from "classnames";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const ChatBox = dynamic(() => import("@components/Chat"), { ssr: false });

function VideoPage({ source }) {
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserName] = useState(null);
  const auth = useAuth();

  useEffect(() => {
    auth.onAuthStateChanged((currentUser: any) => {
      if (currentUser) {
        fetchUserToken(currentUser);
      }
    });
    const fetchUserToken = async currentUser => {
      await axios(
        `${process.env.BACKEND_URL}chat?user=${currentUser.uid}`
      ).then(res => {
        setUserToken(res.data);
        setUserName(currentUser.uid);
      });
    };
  }, []);

  const router = useRouter();
  const { playlist, videoId } = router.query;

  const videoItem = source.playlist.find(i => i.mediaid === videoId);
  const videoColumnClass = classNames({
    "col-12": true,
    "col-sm-8": process.env.CONTENT_CHAT_ENABLED
  });
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
              />
            )}
          </div>
          {process.env.CONTENT_CHAT_ENABLED && userToken && (
            <div className="col-12 col-md-4">
              <ChatBox
                userToken={userToken}
                userId={userId}
                image={process.env.CONTENT_CHAT_AVATAR}
                name={process.env.CONTENT_CHAT_TITLE}
              />
            </div>
          )}
        </div>
      </div>
      <Ads />
      <VideoList
        playlist={source.playlist}
        title="Up Next"
        excludedId={videoId}
      />
    </MainLayout>
  );
}

VideoPage.getInitialProps = async ({}) => {
  let results = await axios.get(process.env.CONTENT_JWT_SOURCE);
  return {
    source: results.data
  };
};

export default VideoPage;
