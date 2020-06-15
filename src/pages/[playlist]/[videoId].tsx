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
    return await fetch(
      `${process.env.BASE_URL}api/chat?user=${currentUser.uid}`
    )
      .then(response => response.json())
      .then(user => {
        setUserToken(user.token);
        setUserName(currentUser.uid);
      });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser: any) => {
      if (process.env.CONTENT_CHAT_ENABLED && currentUser) {
        fetchUserToken(currentUser);
      }
      if (!currentUser) {
        setUserToken(null);
      }
    });
    return () => unsubscribe();
  }, [userId]);

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
      {props => (
        <>
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
                    openModal={props.openAuthModal}
                  />
                )}
              </div>
              {process.env.CONTENT_CHAT_ENABLED && (
                <div className="col-12 col-md-4">
                  <div className="c-chat">
                    {userToken && (
                      <ChatBox
                        userToken={userToken}
                        userId={userId}
                        image={process.env.CONTENT_CHAT_AVATAR}
                        name={process.env.CONTENT_CHAT_TITLE}
                      />
                    )}
                    {!userToken && (
                      <div className="str-chat-channel d-flex align-items-center justify-content-center not-logged-chat">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="29.996"
                          height="29.997"
                        >
                          <path
                            d="M27.345 28.665c-.64-.467-1.131-.819-1.615-1.184-1.549-1.158-3.076-2.353-4.656-3.468-.424-.299-1.008-.508-1.52-.514-3.367-.045-6.736-.01-10.104-.037-.58-.004-1.158-.178-1.738-.271l-.019-.27c.841-.639 1.671-1.295 2.533-1.904.182-.128.479-.125.725-.126 3.255-.009 6.511-.019 9.766.014.383.004.811.188 1.135.41.938.646 1.836 1.352 2.9 2.146v-2.57h2.534V9.141c-1.169 0-2.286-.028-3.397.033-.156.009-.406.455-.412.702-.035 1.823-.011 3.648-.021 5.473-.014 1.921-.983 2.896-2.908 2.899-3.366.01-6.735-.021-10.104.023a2.845 2.845 0 00-1.52.512c-1.895 1.354-3.74 2.772-5.606 4.168-.191.143-.398.264-.736.486 0-1.545-.017-2.937.009-4.324.01-.533-.047-.839-.698-.969C.775 17.92.023 16.918.017 15.752-.004 11.794-.008 7.837.014 3.88c.006-1.431 1.074-2.528 2.5-2.534 6.147-.02 12.293-.019 18.439.004 1.387.006 2.423 1.079 2.49 2.464.029.616.049 1.237.004 1.852-.051.671.132.961.877.907.977-.069 1.964-.027 2.943-.011 1.594.025 2.687 1.016 2.701 2.609.041 3.9.031 7.802 0 11.703-.012 1.33-.771 2.244-2.046 2.533-.464.104-.589.291-.582.727.019 1.179.005 2.357.003 3.535.002.269.002.538.002.996zM20.73 15.677c.067-.188.104-.24.104-.292.01-3.616.006-7.23.029-10.848.004-.585-.315-.609-.75-.609-5.581.007-11.16.014-16.74-.007-.63-.002-.807.196-.801.818.029 3.393.014 6.785.02 10.178 0 .238.041.477.07.789h2.592v2.525c1.068-.802 1.964-1.515 2.906-2.156a2.222 2.222 0 011.143-.384c1.541-.042 3.083-.016 4.626-.014h6.801z"
                            fill="currentColor"
                          />
                          <circle
                            cx="7.457"
                            cy="9.917"
                            r="1.438"
                            fill="currentColor"
                          />
                          <circle
                            cx="12.332"
                            cy="9.917"
                            r="1.438"
                            fill="currentColor"
                          />
                          <circle
                            cx="17.207"
                            cy="9.917"
                            r="1.438"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <Ads />
          <VideoList
            playlist={sourcePlaylist}
            title="Up Next"
            excludedId={id}
          />
        </>
      )}
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
