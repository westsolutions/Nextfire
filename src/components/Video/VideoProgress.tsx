const widthStyle = item => (item.resumeAt / item.duration) * 100 + "%";

export default ({ item }) => (
  <div className="c-video-card__progress">
    <div style={{ width: widthStyle(item) }}></div>
  </div>
);
