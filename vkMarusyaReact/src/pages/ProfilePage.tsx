import { useState } from "react";
import sprite from "../assets/sprite.svg";
import { useFavorites } from "../components/favoritesContext";
import { Link } from "react-router-dom";
import { UserProfile } from "../components/UserProfile";

export function ProfilePage() {
  const { favorites, toggleFavorite } = useFavorites(); 
  const [page, setPage] = useState<"favorites" | "settings">("favorites");

  const handleFavoritesClick = () => {
    setPage("favorites");
  };

  const handleSettingsClick = () => {
    setPage("settings");
  };

  return (
    <>
      <div className="profilePage">
        <div className="container">
          <h1 className="profilePage__title">Мой аккаунт</h1>
          <div className="profilePage__wrapper">
            <div className="profilePage__wrapper-btn">
              <button
                className={`profilePage__btn profilePage__btn--favorite ${
                  page === "favorites" ? "active" : ""
                }`}
                onClick={handleFavoritesClick}
              >
                <svg
                  className="profilePage__icon"
                  width="24"
                  height="24"
                  aria-hidden="true"
                >
                  <use xlinkHref={`${sprite}#icon-like`} />
                </svg>
                <span className="profilePage__btn-text">Избранные фильмы</span>
              </button>
              <button
                className={`profilePage__btn profilePage__btn--user ${
                  page === "settings" ? "active" : ""
                }`}
                onClick={handleSettingsClick}
              >
                <svg className="profilePage__icon-user" width="24" height="24">
                  <use xlinkHref={`${sprite}#icon-user`} />
                </svg>
                <span className="profilePage__btn-text">
                  Настройка аккаунта
                </span>
              </button>
            </div>
            {page === "favorites" && (
              <div className="profilePage__favorite">
                {favorites.length > 0 ? (
                  <ul className="profilePage__list">
                  {favorites.map((movie) => (
                    <li key={movie.id} className="profilePage__item">
                      <button 
                        className="profilePage__close-btn"
                        type="button"
                        onClick={() => toggleFavorite(movie)} 
                        title="Удалить из избранного"
                      >
                        <svg width="24" height="24">
                          <use xlinkHref={`${sprite}#close-icon`} />
                        </svg>
                      </button>
                      
                      <div className="profilePage__card">
                        <Link to={`/movie/${movie.id}`}>
                          <img src={movie.posterUrl} alt={movie.title} />
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
                ) : (
                  <p className="profilePage__empty-message">
                    Нет избранных фильмов
                  </p>
                )}
              </div>
            )}
            {page === "settings" && <UserProfile/>}
          </div>
        </div>
      </div>
    </>
  );
}
