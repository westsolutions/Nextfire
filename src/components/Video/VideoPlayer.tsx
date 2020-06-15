import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ReactJWPlayer from "react-jw-player";
import Cookies from "js-cookie";
import Link from "next/link";
import { isMobile } from "../../helpers";
import { useAuth } from "reactfire";
import sanitizeHtml from "sanitize-html-react";

declare global {
  interface Window {
    jwplayer?: any;
  }
}

export default ({
  videoItem,
  title,
  subTitle,
  redirectLink = "/",
  hasNext = false,
  openModal
}) => {
  const [counter, setCounter] = useState(null);
  const [isFinished, setFinished] = useState(false);
  const [isPaused, setPaused] = useState(false);
  const router = useRouter();
  const auth = useAuth();

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const authSubscription = auth.onAuthStateChanged((currentUser: any) => {
      if (!currentUser && !authenticated) {
        if (typeof window.jwplayer === "function") {
          const player = window.jwplayer();
          if (typeof player.pause === "function") {
            player.pause();
          }
        }

        // openModal();
      }
      setAuthenticated(!!currentUser);
    });
    return () => authSubscription();
  }, [authenticated]);

  const onPlay = () => {
    setPaused(false);
    let cookieData = Cookies.get(`video__${videoItem.mediaid}`);
    const player = window.jwplayer();

    if (!cookieData) {
      player.seek(1);
      return;
    }

    const [resumeAt, duration] = cookieData.split(":");

    if (parseFloat(resumeAt) < parseFloat(duration)) {
      player.seek(parseFloat(resumeAt));
      return;
    }
  };

  const onTime = event => {
    Cookies.set(
      `video__${videoItem.mediaid}`,
      `${event.position}:${event.duration}`
    );
  };

  useEffect(() => {
    if (counter && counter > 0) {
      setTimeout(() => setCounter(counter - 1), 1000);
    } else if (counter == -0) {
      router.push(redirectLink);
    }
  }, [counter]);

  const onVideoEnded = () => {
    setFinished(true);
    setCounter(5);
  };

  const manifestFile = videoItem.sources.filter(
    s => s.type === "application/vnd.apple.mpegurl"
  );
  const redirectionMessage = hasNext ? "next Video" : "Home Page";

  return (
    <div className="c-video">
      {subTitle && <h4 className="c-video__sub-title">{subTitle}</h4>}
      {title && <h1 className="c-video__title">{title}</h1>}
      <div className="row">
        <div className="container">
          {!authenticated && (
            <div className="not-logged-video">
              <svg
                height="48"
                width="48"
                viewBox="0 0 512.13 512.13"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  d="M338.95 243.28l-120-75A15.002 15.002 0 00195.999 181v150a15 15 0 0022.95 12.72l120-75a15 15 0 00.001-25.44zM226 303.936v-95.873L302.698 256z"
                />
                <path
                  fill="currentColor"
                  d="M437 61H75C33.645 61 0 94.645 0 136v240c0 41.355 33.645 75 75 75h362c41.355 0 75-33.645 75-75V136c0-41.355-33.645-75-75-75zm45 315c0 24.813-20.187 45-45 45H75c-24.813 0-45-20.187-45-45V136c0-24.813 20.187-45 45-45h362c24.813 0 45 20.187 45 45z"
                />
              </svg>
            </div>
          )}
          {authenticated && (
            <>
              <ReactJWPlayer
                onResume={() => {
                  setPaused(false);
                }}
                onPlay={() => {
                  setPaused(false);
                }}
                onPause={() => {
                  setPaused(true);
                }}
                onReady={onPlay}
                onTime={onTime}
                onOneHundredPercent={onVideoEnded}
                playerId="my-unique-1"
                playerScript="https://cdn.jwplayer.com/libraries/Izw2Kj6o.js"
                file={manifestFile[0].file}
                isAutoPlay={authenticated && !isMobile()}
                // isAutoPlay={!isMobile()}
              />
              {isFinished && (
                <div className="c-video__overlay">
                  <Link href={redirectLink}>
                    <div className="c-video__icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48px"
                        height="48px"
                        viewBox="0 0 512.13 512.13"
                      >
                        <path
                          fill="currentColor"
                          d="M256.065 0C114.43 0 0 114.298 0 256.065S114.298 512.13 256.065 512.13 512.13 397.832 512.13 256.065 397.702 0 256.065 0zm0 477.892c-122.891 0-221.828-98.937-221.828-221.828S133.175 34.236 256.065 34.236s221.828 98.937 221.828 221.828-98.937 221.828-221.828 221.828z"
                        />
                        <path
                          fill="currentColor"
                          d="M281.711 230.42l-81.883-61.445c-5.077-3.385-15.361-11.977-27.338-5.077-11.977 5.077-11.977 20.439-11.977 29.03v129.659c0 8.591 0 22.13 11.977 29.03 3.385 1.692 5.077 1.692 8.592 1.692 6.769 0 13.669-5.077 18.746-6.769l80.191-61.445c10.284-6.769 15.361-17.053 15.361-29.03 0-10.285-5.207-18.746-13.669-25.645zm-23.954 25.645l-64.83 49.469v-100.76l66.523 49.469-1.693 1.822zM336.256 158.82c-10.284 0-17.054 6.769-17.054 17.053v160.382c0 10.285 6.769 17.053 17.054 17.053 8.592 0 17.054-8.591 17.054-17.053V175.873c0-10.283-6.769-17.053-17.054-17.053z"
                        />
                      </svg>
                    </div>
                  </Link>
                  <div className="c-video__message">
                    You will be redirected to the&nbsp;
                    <Link href={redirectLink}>{redirectionMessage}</Link>
                    &nbsp;after {counter} s.
                  </div>
                </div>
              )}
              {isPaused && isMobile() && (
                <div
                  className="c-video__overlay"
                  onClick={() => {
                    window.jwplayer().play();
                  }}
                >
                  <div className="c-video__icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48px"
                      height="48px"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M256 0C114.833 0 0 114.844 0 256s114.833 256 256 256 256-114.844 256-256S397.167 0 256 0zm0 490.667C126.604 490.667 21.333 385.396 21.333 256S126.604 21.333 256 21.333 490.667 126.604 490.667 256 385.396 490.667 256 490.667z"
                      />
                      <path
                        fill="currentColor"
                        d="M357.771 247.031l-149.333-96c-3.271-2.135-7.5-2.25-10.875-.396A10.653 10.653 0 00192 160v192c0 3.906 2.125 7.49 5.563 9.365a10.68 10.68 0 005.104 1.302c2 0 4.021-.563 5.771-1.698l149.333-96c3.042-1.958 4.896-5.344 4.896-8.969s-1.854-7.01-4.896-8.969zm-144.438 85.427V179.542L332.271 256l-118.938 76.458z"
                      />
                    </svg>
                  </div>
                  <div className="c-video__message">Click to play</div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div>
        <div
          className="c-video__description"
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(videoItem.description)
          }}
        ></div>
      </div>
    </div>
  );
};
