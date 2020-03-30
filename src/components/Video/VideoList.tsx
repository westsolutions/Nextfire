import Link from "next/link";
import Cookies from "js-cookie";
import ScrollMenu from "react-horizontal-scrolling-menu";

export default ({ playlist, title, excludedId = null }) => {
  playlist = excludedId
    ? playlist.filter(i => i.mediaid !== excludedId)
    : playlist;
  playlist = playlist.map(video => {
    let progress = {};
    let cookieData = Cookies.get(`video__${video.mediaid}`);
    if (!cookieData) {
      return video;
    }

    const [resumeAt, duration] = cookieData.split(":");

    if (parseFloat(resumeAt) < parseFloat(duration)) {
      progress = { resumeAt };
    } else {
      progress = { resumeAt, finished: true };
    }
    return {
      ...progress,
      ...video
    };
  });

  console.log(playlist);

  const videoItems = playlist.map((s, i) => (
    <div key={s.mediaid} className="menu-item">
      {renderVideoItem(s, i)}
    </div>
  ));

  return (
    <div className="c-video-list">
      <div className="container">
        {title && <h1 className="c-video-list__title">{title}</h1>}
        <ScrollMenu
          data={videoItems}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          alignCenter={false}
          hideArrows={false}
        />
      </div>
    </div>
  );
};

const Arrow = ({ text, className }) => {
  return <div className={className}>{text}</div>;
};

const ArrowLeft = Arrow({ text: "<", className: "arrow-prev" });
const ArrowRight = Arrow({ text: ">", className: "arrow-next" });

const renderVideoItem = ({ finished, ...item }, index) => {
  return (
    <Link href={`/${item.feedid}/${item.mediaid}/`}>
      <a className="c-video-card">
        <div className="c-video-card__img">
          <img
            className="c-video-card__image"
            src={item.image}
            alt={item.title}
          />
          {finished && (
            <div className="c-video-card__overlay">
              <svg
                width="48"
                height="48"
                viewBox="0 0 76 76"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M54.7978 25.9424C55.9575 27.102 55.9575 28.9818 54.7978 30.1409L34.8817 50.0576C33.722 51.2167 31.8427 51.2167 30.6831 50.0576L21.2022 40.5762C20.0425 39.4171 20.0425 37.5373 21.2022 36.3782C22.3613 35.2185 24.2411 35.2185 25.4002 36.3782L32.7821 43.7601L50.5992 25.9424C51.7589 24.7833 53.6387 24.7833 54.7978 25.9424ZM76 38C76 59.0045 59.0016 76 38 76C16.9955 76 0 59.0016 0 38C0 16.9955 16.9984 0 38 0C59.0045 0 76 16.9984 76 38ZM70.0625 38C70.0625 20.2774 55.7203 5.9375 38 5.9375C20.2774 5.9375 5.9375 20.2797 5.9375 38C5.9375 55.7226 20.2797 70.0625 38 70.0625C55.7226 70.0625 70.0625 55.7203 70.0625 38Z"
                  fill="#fff"
                />
              </svg>
            </div>
          )}
          {item.resumeAt && (
            <div className="c-video-card__progress">
              <span
                style={{ width: (item.resumeAt / item.duration) * 100 + "%" }}
              ></span>
            </div>
          )}
        </div>
        <h4 className="c-video-card__title" title={item.title}>
          {item.title}
        </h4>
        <small className="c-video-card__duration">
          {durationInMinutes(item.duration)}
        </small>
      </a>
    </Link>
  );
};

const durationInMinutes = totalSeconds => {
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  return `${hours ? hours + " h " : ""}${minutes ? minutes + " min" : ""}`;
};
