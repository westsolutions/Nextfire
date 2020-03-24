import Link from "next/link";
import Cookies from "js-cookie";

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

    // console.log(resumeAt, duration);
    if (parseFloat(resumeAt) < parseFloat(duration)) {
      progress = { resumeAt };
    }
    return {
      ...progress,
      ...video
    };
  });

  console.log(playlist);

  return (
    <div className="c-video-list">
      <div className="container">
        {title && <h1 className="c-video-list__title">{title}</h1>}
        <div className="row">
          {playlist.map((s, i) => (
            <div key={i} className="col-12 col-md-4">
              {renderVideoItem(s, i)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const renderVideoItem = (item, index) => {
  return (
    <Link href={`/${item.feedid}/${item.mediaid}/`}>
      <a className="c-video-card">
        <div className="c-video-card__img">
          <img
            className="c-video-card__image"
            src={item.image}
            alt={item.title}
          />
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
