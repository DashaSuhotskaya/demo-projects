import { useEffect, useState } from "react";
import { getGenres } from "../api/movieApi";
import { Loader } from "../components/Loader/Loader";
import { Link } from "react-router-dom";

import horrorImg from "../assets/img/horror.png";
import historyImg from "../assets/img/history.png";
import scifiImg from "../assets/img/scifi.png";
import comedyImg from "../assets/img/comedy.png";
import dramaImg from "../assets/img/drama.png";
import adventureImg from "../assets/img/adventure.png";
import romanceImg from "../assets/img/romance.png";
import thrillerImg from "../assets/img/thriller.png";
import westernImg from "../assets/img/western.png";
import standupImg from "../assets/img/standup.png";
import fantasyImg from "../assets/img/fantasy.png";
import mysteryImg from "../assets/img/mystery.png";
import familyImg from "../assets/img/family.png";
import musicImg from "../assets/img/music.png";
import crimeImg from "../assets/img/crime.png";
import tvmovieImg from "../assets/img/tv-movie.png";
import documentaryImg from "../assets/img/documentary.png";
import actionImg from "../assets/img/action.png";
import animationImg from "../assets/img/animation.png";
import warImg from "../assets/img/war.png";

export function GenresPage() {
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const genresPictures = {
    horror: horrorImg,
    history: historyImg,
    scifi: scifiImg,
    comedy: comedyImg,
    drama: dramaImg,
    adventure: adventureImg,
    romance: romanceImg,
    thriller: thrillerImg,
    western: westernImg,
    "stand-up": standupImg,
    fantasy: fantasyImg,
    mystery: mysteryImg,
    family: familyImg,
    music: musicImg,
    crime: crimeImg,
    "tv-movie": tvmovieImg,
    documentary: documentaryImg,
    action: actionImg,
    animation: animationImg,
    war: warImg,
  };

  const fetchGenres = async () => {
    try {
      const response = await getGenres();
      setGenres(response.data);
    } catch (error) {
      console.error("Ошибка при загрузке жанров", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await fetchGenres();
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <section className="genresPage">
        <div className="container">
          <h1 className="genresPage__title">Жанры фильмов</h1>
          <div className="genresPage__wrapper">
            <ul className="genresPage__list">
              {genres.map((genre, index) => (
                <li key={index} className="genresPage__item">
                  <Link to={`/genres/${genre}`} className="genresPage__link">
                    <img
                      className="genresPage__img"
                      src={genresPictures[genre]}
                      alt={genre}
                      width={290}
                      height={220}
                    />
                    <span className="genresPage__genre">{genre}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
