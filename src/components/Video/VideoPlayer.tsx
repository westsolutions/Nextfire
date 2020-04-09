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
  const [counter, setCounter] = useState(null);
  const [isFinished, setFinished] = useState(false);
  const [isPaused, setPaused] = useState(false);
  const router = useRouter();

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

  // TODO: video selector
  return (
    <div className="c-video">
      {subTitle && <h4 className="c-video__sub-title">{subTitle}</h4>}
      {title && <h1 className="c-video__title">{title}</h1>}
      <div className="row">
        <div className="container">
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
            isAutoPlay={!isMobile()}
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
                <Link href={redirectLink}>
                  {redirectionMessage}
                </Link>&nbsp;after {counter} s.
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
        </div>
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
  );
};

const isMobile = () => {
  var isMobile = false;
  if (
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
      navigator.userAgent
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
      navigator.userAgent.substr(0, 4)
    )
  ) {
    isMobile = true;
  }
  return isMobile;
};
