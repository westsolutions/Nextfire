import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ReactJWPlayer from "react-jw-player";
import Cookies from "js-cookie";
import Link from "next/link";
import DOMPurify from "dompurify";

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
  hasNext = false
}) => {
  const onPlay = () => {
    let cookieData = Cookies.get(`video__${videoItem.mediaid}`);

    if (!cookieData) {
      return;
    }

    const [resumeAt, duration] = cookieData.split(":");

    if (parseFloat(resumeAt) < parseFloat(duration)) {
      const player = window.jwplayer();
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

  const [counter, setCounter] = useState(null);
  useEffect(() => {
    if (counter && counter > 0) {
      setTimeout(() => setCounter(counter - 1), 1000);
    } else if (counter == -0) {
      router.push(redirectLink);
    }
  }, [counter]);

  const [isFinished, setFinished] = useState(false);

  const router = useRouter();
  const onVideoEnded = () => {
    setFinished(true);
    setCounter(5);
  };

  const manifestFile = videoItem.sources.filter(
    s => s.type === "application/vnd.apple.mpegurl"
  );
  const redirectionMessage = hasNext ? "next Video" : "Home Page";

  // TODO: video selector
  return (
    <div className="c-video">
      {subTitle && <h4 className="c-video__sub-title">{subTitle}</h4>}
      {title && <h1 className="c-video__title">{title}</h1>}
      <div className="row">
        <div className="container">
          <ReactJWPlayer
            onReady={onPlay}
            onTime={onTime}
            onOneHundredPercent={onVideoEnded}
            playerId="my-unique-1"
            playerScript="https://cdn.jwplayer.com/libraries/Izw2Kj6o.js"
            file={manifestFile[0].file}
            isAutoPlay={true}
          />
          {isFinished && (
            <div className="c-video__overlay">
              <Link href={redirectLink}>
                <div className="c-video__icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="64px"
                    height="64px"
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
                <Link href={redirectLink}>
                  {redirectionMessage}
                </Link>&nbsp;after {counter} s.
              </div>
            </div>
          )}
        </div>
        <div className="container">
          <div
            className="c-video__description"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(videoItem.description)
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
