import React from 'react';
import { Link } from 'react-router-dom';
import type { Movie } from '../types/movie';
import sprite from '../assets/sprite.svg';
import { formatMovieDuration } from '../utils/formatTime';

interface SearchResultsProps {
  results: Movie[];
  onClose: () => void;
}

const getRatingClassName = (rating: number): string => {
  if (rating >= 8) return "search-results__rating--high";
  if (rating >= 7) return "search-results__rating--good";
  if (rating >= 5) return "search-results__rating--medium";
  return "search-results__rating--low";
};

export const SearchResults: React.FC<SearchResultsProps> = ({ results, onClose }) => {
  return (
    <div className="search-results">
      <div className="search-results__inner">
        {results.length > 0 ? (
          <ul className="search-results__list">
            {results.map((movie) => {
              const ratingClassName = getRatingClassName(movie.tmdbRating);
              
              return (
                <li key={movie.id} className="search-results__item">
                  <Link to={`/movie/${movie.id}`} onClick={onClose} className="search-results__link">
                      <img src={movie.posterUrl} alt={movie.title} className="search-results__poster" />
                      <div className="search-results__info">
                          <div className="search-results__meta">
                              <div className={`search-results__rating ${ratingClassName}`}>
                                  <svg className="search-results__rating-icon" width={10} height={10} aria-hidden="true">
                                      <use xlinkHref={`${sprite}#icon-star`} />
                                  </svg>
                                  <span className="search-results__rating-value">
                                      {movie.tmdbRating.toFixed(1)}
                                  </span>
                              </div>

                              <span className="search-results__text">{movie.releaseYear}</span>
                              <span className="search-results__text">{movie.genres[0]}</span> 
                              <span className="search-results__text">{formatMovieDuration(movie.runtime)}</span>
                          </div>
                          <h3 className="search-results__title">{movie.title}</h3>
                      </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="search-results__empty">Ничего не найдено</p>
        )}
      </div>
    </div>
  );
};
