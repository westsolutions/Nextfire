export default ({ youtubeId }) => {
  return (
    <div className="c-youtube">
      <iframe
        // src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
        src={`https://www.youtube.com/embed/${youtubeId}`}
        frameBorder="0"
        allowFullScreen
        allow="autoplay; encrypted-media;"
      />
    </div>
  );
};
