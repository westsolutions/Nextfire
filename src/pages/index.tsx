import React, { useEffect, useState } from "react";
import MainLayout from "@layouts/MainLayout";
import Head from "next/head";
import { useAuth } from "reactfire";
import dynamic from "next/dynamic";
import axios from "axios";
import YouTube from "@components/YoutubeIframe";
const ChatBox = dynamic(() => import("@components/Chat"), { ssr: false });

function Index() {
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
        `${process.env.BACKEND_URL}:${process.env.SERVER_PORT}/chat?user=${currentUser.uid}`
      ).then(res => {
        setUserToken(res.data);
        setUserName(currentUser.uid);
      });
    };
  }, []);

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
              {userToken && <ChatBox userToken={userToken} userId={userId} />}
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

export default Index;
