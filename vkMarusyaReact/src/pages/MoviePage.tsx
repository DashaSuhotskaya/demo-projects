import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieById } from "../api/movieApi";
import { MovieDetails } from "../components/home/MovieDetails";
import { Loader } from "../components/Loader/Loader";
import type { Movie } from "../types/movie";

export function MoviePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        const response = await getMovieById(Number(id));
        setMovie(response.data);
      } catch (err) {
        console.error("Ошибка при загрузке фильма", err);
        setError("Фильм не найден");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  if (error || !movie) {
    return (
      <div className="moviePage moviePage--error">
        <div className="container">
          <h1>Фильм не найден</h1>
          <button onClick={() => navigate(-1)} className="btn btn--back">
            Вернуться назад
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="moviePage">
      <div className="container">
        <MovieDetails movie={movie} showDetailsButton={false} />
        <h3 className="moviePage__title">О фильме</h3>
        <div className="moviePage__row">
          <span className="moviePage__left">Язык оригинала</span>
          <span className="moviePage__right">{movie.language}</span>
        </div>
        <div className="moviePage__row">
          <span className="moviePage__left">Бюджет</span>
          <span className="moviePage__right">{movie.budget}</span>
        </div>
        <div className="moviePage__row">
          <span className="moviePage__left">Выручка</span>
          <span className="moviePage__right">{movie.revenue}</span>
        </div>
        <div className="moviePage__row">
          <span className="moviePage__left">Режиссёр</span>
          <span className="moviePage__right">{movie.director}</span>
        </div>
        <div className="moviePage__row">
          <span className="moviePage__left">Продакшен</span>
          <span className="moviePage__right">{movie.production}</span>
        </div>
        <div className="moviePage__row">
          <span className="moviePage__left">Награды</span>
          <span className="moviePage__right">{movie.awardsSummary}</span>
        </div>
      </div>
    </div>
  );
}
