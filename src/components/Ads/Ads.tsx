import classname from "classnames";

export default () => {
  // TODO: video selector
  const hrefs = process.env.CONTENT_IMG_HREF
    ? process.env.CONTENT_IMG_HREF.split(", ")
    : [];
  const images = process.env.CONTENT_IMG
    ? process.env.CONTENT_IMG.split(", ")
    : [];
  const ads = hrefs.map((item, index) => {
    return {
      href: hrefs[index],
      image: images[index]
    };
  });
  const cols = hrefs.length ? Math.ceil(12 / hrefs.length) : 12;
  const desktopClassName = `col-12 col-md-${cols}`;

  return (
    <div className="s-card">
      <div className="container">
        <div className="row">
          {ads.map((a, key) => (
            <div key={key} className={desktopClassName}>
              <div className="c-card">
                <a target="_blank" href={a.href}>
                  <img src={a.image} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
