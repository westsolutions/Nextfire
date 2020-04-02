import { useState } from "react";
import ReactJWPlayer from "react-jw-player";
import Cookies from "js-cookie";

declare global {
  interface Window {
    jwplayer?: any;
  }
}

export default ({ videoItem, title, subTitle, onEnd, hasNext = false }) => {
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

  const [isFinished, setFinished] = useState(false);
  const onVideoEnded = event => {
    setFinished(true);
    onEnd(event);
  };

  const video = videoItem.sources.filter(s => s.width > 480);
  const redirectionMessage = `You will be redirected to the ${
    hasNext ? "next Video" : "Home Page"
  } after 5s.`;

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
              <div className="c-video__message">{redirectionMessage}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
