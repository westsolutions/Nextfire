import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ReactJWPlayer from "react-jw-player";
import Cookies from "js-cookie";
import Link from "next/link";

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
      var player = window.jwplayer();
      player.seek(resumeAt);
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

  const video = videoItem.sources.filter(s => s.width > 480);
  const redirectionMessage = hasNext ? " next Video " : " Home Page ";

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
            file={video[0].file}
          />
          {isFinished && (
            <div className="c-video__overlay">
              <div className="c-video__message">
                You will be redirected to the
                <Link href={redirectLink}>{redirectionMessage}</Link>
                after {counter} s.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
