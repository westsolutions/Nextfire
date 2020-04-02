import Link from "next/link";
import Cookies from "js-cookie";
import ScrollMenu from "react-horizontal-scrolling-menu";
import { useState, useRef } from "react";
import { useRouter } from "next/router";

export default ({ playlist, title, excludedId = null }) => {
  const refScrollMenu = useRef();

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

  const videoItems = playlist.map((s, i) => (
    <div key={s.mediaid + i} className="menu-item">
      {renderVideoItem(s, i)}
    </div>
  ));

  return (
    <div className="c-video-list">
      <div className="container">
        {title && <h1 className="c-video-list__title">{title}</h1>}
        <ScrollMenu
          ref={refScrollMenu}
          data={videoItems}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          alignCenter={false}
          // translate={7.5}
          hideSingleArrow={true}
          inertiaScrollingSlowdown={0}
        />
      </div>
    </div>
  );
};

const Arrow = ({ child, className }) => {
  return <div className={className}>{child}</div>;
};

const ArrowRight = Arrow({
  child: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24px"
      height="24px"
      viewBox="0 0 492.004 492.004"
    >
      <path
        fill="currentColor"
        d="M382.678 226.804L163.73 7.86C158.666 2.792 151.906 0 144.698 0s-13.968 2.792-19.032 7.86l-16.124 16.12c-10.492 10.504-10.492 27.576 0 38.064L293.398 245.9l-184.06 184.06c-5.064 5.068-7.86 11.824-7.86 19.028 0 7.212 2.796 13.968 7.86 19.04l16.124 16.116c5.068 5.068 11.824 7.86 19.032 7.86s13.968-2.792 19.032-7.86L382.678 265c5.076-5.084 7.864-11.872 7.848-19.088.016-7.244-2.772-14.028-7.848-19.108z"
      />
    </svg>
  ),
  className: "arrow-prev"
});

const ArrowLeft = Arrow({
  child: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24px"
      height="24px"
      viewBox="0 0 492 492"
    >
      <path
        fill="currentColor"
        d="M198.608 246.104L382.664 62.04c5.068-5.056 7.856-11.816 7.856-19.024 0-7.212-2.788-13.968-7.856-19.032l-16.128-16.12C361.476 2.792 354.712 0 347.504 0s-13.964 2.792-19.028 7.864L109.328 227.008c-5.084 5.08-7.868 11.868-7.848 19.084-.02 7.248 2.76 14.028 7.848 19.112l218.944 218.932c5.064 5.072 11.82 7.864 19.032 7.864 7.208 0 13.964-2.792 19.032-7.864l16.124-16.12c10.492-10.492 10.492-27.572 0-38.06L198.608 246.104z"
      />
    </svg>
  ),
  className: "arrow-next"
});

const renderVideoItem = ({ finished, ...item }, index) => {
  const [isSwiping, setSwiping] = useState(false);
  const router = useRouter();
  return (
    <div
      className="c-video-card"
      onMouseDown={() => {
        setSwiping(false);
      }}
      onMouseMove={() => {
        setSwiping(true);
      }}
      onMouseUp={e => {
        if (isSwiping) {
          e.preventDefault;
        } else {
          router.push(`/${item.feedid}/${item.mediaid}__${index}/`);
        }
        setSwiping(false);
      }}
    >
      <div className="c-video-card__img">
        <div>
          <img
            className="c-video-card__image"
            src={item.image}
            alt={item.title}
          />
        </div>
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
      <Link href={`/${item.feedid}/${item.mediaid}/`}>
        <h4 className="c-video-card__title" title={item.title}>
          {item.title}
        </h4>
      </Link>
      <small className="c-video-card__duration">
        {durationInMinutes(item.duration)}
      </small>
    </div>
  );
};

const durationInMinutes = totalSeconds => {
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  return `${hours ? hours + " h " : ""}${minutes ? minutes + " min" : ""}`;
};
