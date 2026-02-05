import { useEffect, useState } from "react";
import { getRandomMovie } from "../../api/movieApi";
import { MovieDetails } from "./MovieDetails";
import type { Movie } from "../../types/movie";

export function RandomMovieBlock() {
  const [randomMovie, setRandomMovie] = useState<Movie | null>(null);

  const fetchRandomMovie = async () => {
    try {
      const response = await getRandomMovie();
      setRandomMovie(response.data);
    } catch (error) {
      console.error("Ошибка при загрузке случайного фильма", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchRandomMovie();
    };
    fetchData();
  }, []);

  return (
    <>
      {randomMovie && (
        <MovieDetails 
          movie={randomMovie} 
          showActions={true} 
          onRandomClick={fetchRandomMovie}
        />
      )}
    </>
  );
}