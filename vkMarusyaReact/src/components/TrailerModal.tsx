import sprite from "../assets/sprite.svg";
interface TrailerModalProps {
  trailerUrl: string;
  onClose: () => void;
}

export function TrailerModal({ trailerUrl, onClose }: TrailerModalProps) {
  const getEmbedUrl = (url: string) => {
    if (url.includes("://youtube.com")) {
      return url.replace("watch?v=", "embed/");
    }
    return url;
  };

  return (
    <div className="trailerModal" onClick={onClose}>
      <div
        className="trailerModal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="trailerModal__btn" onClick={onClose}>
          <svg width="24" height="24">
            <use xlinkHref={`${sprite}#close-icon`} />
          </svg>
        </button>

        <iframe
          className="trailerModal__video-container"
          src={`${getEmbedUrl(trailerUrl)}?autoplay=1`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
