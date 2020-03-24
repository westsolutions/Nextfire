import Link from "next/link";

export default ({ playlist, title, excludedId = null }) => {
  const excludedIndex = excludedId
    ? playlist.findIndex(i => i.mediaid !== excludedId)
    : null;

  return (
    <div className="c-video-list">
      <div className="container">
        {title && <h1 className="c-video-list__title">{title}</h1>}
        <div className="row">
          {playlist.map((s, i) => {
            if (excludedIndex && excludedIndex === i) {
              return;
            }
            return (
              <div key={i} className="col-12 col-sm-4">
                {renderVideoItem(s, i)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const renderVideoItem = (item, index) => {
  return (
    <Link href={`/${item.feedid}/${item.mediaid}/`}>
      <a className="c-video-card">
        <div>
          <img
            className="c-video-card__image"
            src={item.image}
            alt="{item.title}"
          />
        </div>
        <h4 className="c-video-card__title" title={item.title}>
          Session {index} | {item.title}
        </h4>
        <small className="c-video-card__duration">
          {durationInMinutes(item.duration)}
        </small>
      </a>
    </Link>
  );
};

const duration = totalSeconds => {
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${hours ? hours + ":" : ""}${minutes ? minutes + ":" : ""}${seconds}`;
};

const durationInMinutes = totalSeconds => {
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  return `${hours ? hours + " h " : ""}${minutes ? minutes + " min" : ""}`;
};
