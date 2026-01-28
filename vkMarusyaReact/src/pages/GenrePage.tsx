import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovies } from "../api/movieApi";
import { Loader } from "../components/Loader/Loader";
import sprite from "../../src/assets/sprite.svg";

export function GenrePage() {
  const { genre } = useParams<{ genre: string }>();
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!genre) return;

    const loadInitialMovies = async () => {
      try {
        setLoading(true);

        const response = await getMovies({
          genre: genre,
          sortField: "rating.kp",
          sortType: -1,
        });

        const allMovies = response.data as any[];

        const first10 = allMovies.slice(0, 10);

        setMovies(first10);
        setHasMore(allMovies.length > 10);
        setPage(1);
      } catch (err) {
        console.error("Ошибка:", err);
        setError("Не удалось загрузить фильмы");
      } finally {
        setLoading(false);
      }
    };

    loadInitialMovies();
  }, [genre]);

  const loadMoreMovies = async () => {
    if (loadingMore || !hasMore) return;

    try {
      setLoadingMore(true);

      const response = await getMovies({
        genre: genre,
        sortField: "rating.kp",
        sortType: -1,
      });

      const allMovies = response.data as any[];

      const start = page * 10;
      const next10 = allMovies.slice(start, start + 10);

      setMovies((prev) => [...prev, ...next10]);
      setPage((prev) => prev + 1);
      setHasMore(allMovies.length > start + 10);
    } catch (err) {
      console.error("Ошибка:", err);
    } finally {
      setLoadingMore(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <section className="genrePage">
        <div className="container">
          <Link to={`/genres/`}>
            <h1 className="genrePage__title-wrapper">
              <svg
                className="genrePage__icon"
                width="40"
                height="40"
                aria-hidden="true"
              >
                <use xlinkHref={`${sprite}#arrow-icon`} />
              </svg>
              <span className="genrePage__text">{genre}</span>
            </h1>
          </Link>
          <div>{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="genrePage">
      <div className="container">
        <Link to={`/genres/`} className="genrePage__link">
          <h1 className="genrePage__title-wrapper">
            <svg
              className="genrePage__icon"
              width="40"
              height="40"
              aria-hidden="true"
            >
              <use xlinkHref={`${sprite}#arrow-icon`} />
            </svg>
            <span className="genrePage__text">{genre}</span>
          </h1>
        </Link>
        {movies.length === 0 && !loading && (
          <div className="genrePage__empty">
            <h2 className="genrePage__empty-title">Фильмов не найдено</h2>
          </div>
        )}

        {movies.length > 0 && (
          <>
            <ul className="genrePage__list">
              {movies.map((movie, index) => (
                <li key={`${movie.id}-${index}`} className="genrePage__item">
                  <Link to={`/movie/${movie.id}`}>
                    {movie.posterUrl ? (
                      <img
                        src={movie.posterUrl}
                        alt={movie.title}
                        className="genrePage__poster"
                      />
                    ) : (
                      <div className="genrePage__poster genrePage__poster--placeholder">
                      Нет изображения
                    </div>
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            {hasMore && (
              <div className="genrePage__load-more">
                <button
                  onClick={loadMoreMovies}
                  disabled={loadingMore}
                  className="genrePage__load-btn"
                >
                  Показать еще
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
