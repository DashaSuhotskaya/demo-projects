import type { Movie } from "../../types/movie";
import { formatMovieDuration } from "../../utils/formatTime";
import sprite from "../../assets/sprite.svg";
import { useFavorites } from "../favoritesContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import { TrailerModal } from "../TrailerModal";
import { AuthForm } from "../AuthForm";
import { getProfile } from "../../api/authApi";

interface MovieDetailsProps {
  movie: Movie;
  showActions?: boolean;
  onRandomClick?: () => void;
  onTrailerClick?: () => void;
  onLikeClick?: () => void;
  showDetailsButton?: boolean;
  showRandomButton?: boolean;
}

export function MovieDetails({
  movie,
  showActions = true,
  onRandomClick,
  showDetailsButton = true,
  showRandomButton = true,
}: MovieDetailsProps) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const active = isFavorite(movie.id);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const handleLikeClick = async () => {
    try {
      await getProfile();
      toggleFavorite(movie);
    } catch (error) {
      setIsAuthOpen(true);
    }
  };

  const getRatingClassName = (rating: number) => {
    if (rating >= 8) return "movieDetails__rating--high";
    if (rating >= 7) return "movieDetails__rating--good";
    if (rating >= 5) return "movieDetails__rating--medium";
    return "movieDetails__rating--low";
  };

  return (
    <div className="movieDetails">
      <div className="movieDetails__content">
        <div className="movieDetails__info">
          <div className="movieDetails__meta">
            <div
              className={`movieDetails__rating ${getRatingClassName(
                movie.tmdbRating
              )}`}
            >
              <svg
                className="movieDetails__rating-icon"
                width={16}
                height={16}
                aria-hidden="true"
              >
                <use xlinkHref={`${sprite}#icon-star`} />
              </svg>
              <span className="movieDetails__rating-value">
                {movie.tmdbRating.toFixed(1)}
              </span>
            </div>
            <span className="movieDetails__text">{movie.releaseYear}</span>
            <span className="movieDetails__text">{movie.genres[0]}</span>
            <span className="movieDetails__text">
              {formatMovieDuration(movie.runtime)}
            </span>
          </div>
          <h2 className="movieDetails__title">{movie.title}</h2>
          <p className="movieDetails__description">{movie.plot}</p>

          {showActions && (
            <div className="movieDetails__actions">
              {movie.trailerUrl && (
                <button
                  className="movieDetails__btn movieDetails__btn--trailer"
                  onClick={() => setIsTrailerOpen(true)}
                >
                  Трейлер
                </button>
              )}
              {showDetailsButton && (
                <button className="movieDetails__btn movieDetails__btn--details">
                  <Link to={`/movie/${movie.id}`}>О фильме</Link>
                </button>
              )}

              <button
                className={`movieDetails__btn movieDetails__btn--like ${
                  active ? "movieDetails__btn--like--active" : ""
                }`}
                onClick={handleLikeClick}
              >
                <svg
                  className="movieDetails__icon"
                  width="24"
                  height="24"
                  aria-hidden="true"
                >
                  <use xlinkHref={`${sprite}#icon-like`} />
                </svg>
              </button>

              {showRandomButton && onRandomClick && (
                <button
                  className="movieDetails__btn movieDetails__btn--random"
                  onClick={onRandomClick}
                >
                  <svg
                    className="movieDetails__icon"
                    width="24"
                    height="24"
                    aria-hidden="true"
                  >
                    <use xlinkHref={`${sprite}#icon-random`} />
                  </svg>
                </button>
              )}
            </div>
          )}
        </div>
        {isTrailerOpen && movie.trailerUrl && (
          <TrailerModal
            trailerUrl={movie.trailerUrl}
            onClose={() => setIsTrailerOpen(false)}
          />
        )}

        {isAuthOpen && (
          <AuthForm
            onClose={() => setIsAuthOpen(false)}
            onSuccess={() => {
              setIsAuthOpen(false);
            }}
          />
        )}
        {movie.backdropUrl ? (
          <img
            className="movieDetails__poster"
            src={movie.backdropUrl}
            width={680}
            height={552}
            alt={movie.title}
          />
        ) : (
          <div className="movieDetails__poster movieDetails__poster--placeholder">
            Нет изображения
          </div>
        )}
      </div>
    </div>
  );
}
