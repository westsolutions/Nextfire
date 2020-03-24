import React, { useEffect, useState } from "react";
import MainLayout from "@layouts/MainLayout";
import Link from "next/link";
import Head from "next/head";
import { useAuth } from "reactfire";
import dynamic from "next/dynamic";
import axios from "axios";
// import YouTube from "@components/YoutubeIframe";

import ReactJWPlayer from "react-jw-player";
const ChatBox = dynamic(() => import("@components/Chat"), { ssr: false });

function Index({ source }) {
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserName] = useState(null);
  const auth = useAuth();

  useEffect(() => {
    console.log(source);
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

  return (
    <MainLayout>
      <Head>
        <title>Live Stream Event | Tribe</title>
      </Head>
      <div className="s-video">
        <div className="s-video__content">
          <div className="container">
            {source.title && <h1>{source.title}</h1>}
            <div className="row">
              {source.playlist.map((s, i) => (
                <div className="col-12 col-sm-3">{renderVideoItem(s, i)}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="s-video">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-8">
              <div className="c-video">
                <div className="c-video__content">
                  {/* <YouTube youtubeId={process.env.CONTENT_VIDEO_YOUTUBE_ID} /> */}

                  <div className="d-md-flex justify-content-md-between align-items-center">
                    <h1>{process.env.CONTENT_VIDEO_TITLE}</h1>
                    <div className="c-live">WE'RE LIVE</div>
                  </div>
                  <p>{process.env.CONTENT_VIDEO_CONTENT}</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              {userToken && (
                <ChatBox
                  userToken={userToken}
                  userId={userId}
                  image={process.env.CONTENT_CHAT_AVATAR}
                  name={process.env.CONTENT_CHAT_TITLE}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="s-card">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-8">
              <div className="c-card">
                <a target="_blank" href={process.env.CONTENT_IMG_HREF_1}>
                  <img src={process.env.CONTENT_IMG_1} alt="" />
                </a>
              </div>
            </div>
            {/* <div className="col-12 col-md-4">
              <div className="c-card">
                <a target="_blank" href={process.env.CONTENT_IMG_HREF_2}>
                  <img src={process.env.CONTENT_IMG_2} alt="" />
                </a>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="c-card">
                <a target="_blank" href={process.env.CONTENT_IMG_HREF_3}>
                  <img src={process.env.CONTENT_IMG_3} alt="" />
                </a>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

const renderVideoItem = (item, index) => {
  return (
    <>
      <div className="card">
        <img className="card-img-top" src={item.image} alt="{item.title}" />
      </div>
      <h4>
        Session {index} | {item.title}
      </h4>
      <small>{duration(item.duration)}</small>
    </>
  );
};

const duration = totalSeconds => {
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${hours ? hours + ":" : ""}${minutes ? minutes + ":" : ""}${seconds}`;
};

Index.getInitialProps = async ({
  req,
  res,
  match,
  history,
  location,
  ...ctx
}) => {
  let results = await axios.get(process.env.CONTENT_JWT_SOURCE);
  return {
    source: results.data
  };
};

export default Index;
