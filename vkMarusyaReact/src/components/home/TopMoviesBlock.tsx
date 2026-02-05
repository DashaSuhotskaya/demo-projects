import { useEffect, useState } from "react";
import type { Movie } from "../../types/movie";
import { getTop10Movies } from "../../api/movieApi";
import { Link } from "react-router-dom";

export function TopMoviesBlock() {
  const [topMovies, setTopMovies] = useState<Movie[]>([]);

  const fetchTopMovies = async () => {
    try {
      const response = await getTop10Movies();
      setTopMovies(response.data);
    } catch (error) {
      console.error("Ошибка при загрузке топа фильмов", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchTopMovies();
    };
    fetchData();
  }, []);

  return (
    <>
      {topMovies && (
        <div className="topMovies">
          <div className="topMovies__wrapper">
            <h2 className="topMovies__title">Топ 10 фильмов</h2>
            <ul className="topMovies__list">
              {topMovies.map((movie, index) => (
                <li key={movie.id} className="topMovies__item">
                  <span className="topMovies__rank">{index + 1}</span>

                  <Link to={`/movie/${movie.id}`} className="topMovies__link">
                    {movie.posterUrl ? (
                      <img
                        src={movie.posterUrl}
                        alt={movie.title}
                        className="topMovies__poster"
                      />
                    ) : (
                      <div className="topMovies__poster topMovies__poster--placeholder">
                      Нет изображения
                    </div>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
