import { useEffect, useState } from "react";
import { RandomMovieBlock } from "../components/home/RandomMovieBlock";
import { TopMoviesBlock } from "../components/home/TopMoviesBlock";
import { getRandomMovie, getTop10Movies } from "../api/movieApi";
import { Loader } from "../components/Loader/Loader";

export function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getRandomMovie(),
      getTop10Movies()
    ])
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка при загрузке данных главной страницы:", err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
        <Loader />
    );
  }

  return (
    <>
      <section className="homePage">
        <div className="container">
          <div className="homePage__wrapper">
            <h1 className="visually-hidden">VK Маруся — фильмы</h1>
            <RandomMovieBlock/>
            <TopMoviesBlock/>
          </div>
        </div>
      </section>
    </>
  );
}
