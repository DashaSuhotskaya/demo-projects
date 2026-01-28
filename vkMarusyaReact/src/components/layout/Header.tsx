import { NavLink, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import sprite from "../../assets/sprite.svg";
import { AuthForm } from "../AuthForm";
import type { Movie } from "../../types/movie";
import { SearchResults } from "../SearchResults";
import { getMovies } from "../../api/movieApi";
import { useAuth } from "../AuthContext";

export function Header() {
  const { user } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [allMoviesCache, setAllMoviesCache] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadAllMovies = async () => {
      try {
        const response = await getMovies();
        setAllMoviesCache(response.data);
      } catch (error) {
        console.error("Ошибка загрузки всех фильмов:", error);
      }
    };
    loadAllMovies();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setIsDropdownOpen(false);
      setSearchResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      const filteredMovies = allMoviesCache.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredMovies);
      setIsDropdownOpen(true);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, allMoviesCache]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
        setIsMobileSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setIsDropdownOpen(false);
    setIsMobileSearchOpen(false);
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Link to="/">
              <svg
                className="header__icon-logo"
                viewBox="0 0 144 32"
                aria-hidden="true"
              >
                <use xlinkHref={`${sprite}#icon-logo`}></use>
              </svg>
            </Link>
            <div className="header__wrapper-center">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "header__link header__link--main header__link--active"
                    : "header__link"
                }
                to="/"
              >
                <span className="header__link-text header__link-text--main">
                  Главная
                </span>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "header__link header__link--active"
                    : "header__link"
                }
                to="/genres"
              >
                <span className="header__link-text header__link-text--genres">
                  Жанры
                </span>
                <svg
                  className="header__icon-genres"
                  width="24"
                  height="24"
                  aria-hidden="true"
                >
                  <use xlinkHref={`${sprite}#icon-genres`}></use>
                </svg>
              </NavLink>
              <div className="header__search" ref={searchRef}>
                <svg
                  className="header__icon-search"
                  width="24"
                  height="24"
                  aria-hidden="true"
                >
                  <use xlinkHref={`${sprite}#icon-search`}></use>
                </svg>
                <input
                  className="header__field"
                  type="text"
                  placeholder="Поиск"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  onFocus={() =>
                    searchQuery.trim() !== "" && setIsDropdownOpen(true)
                  }
                />
                {searchQuery && (
                  <button
                    className="header__search-clear"
                    onClick={handleClearSearch}
                  >
                    <svg width="24" height="24">
                      <use xlinkHref={`${sprite}#close-icon`} />
                    </svg>
                  </button>
                )}
                <button
                  className="header__mobile-search-btn"
                  onClick={() => setIsMobileSearchOpen(true)}
                >
                  <svg width="24" height="24" aria-hidden="true">
                    <use xlinkHref={`${sprite}#icon-search2`} />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <SearchResults
                    results={searchResults}
                    onClose={handleClearSearch}
                  />
                )}
              </div>
            </div>

            {user ? (
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "header__link header__link--active"
                    : "header__link"
                }
                to="/profile"
              >
                <span className="header__link-text header__link-text--user">
                  {user.name}
                </span>
                <svg className="header__icon-user" width="24" height="24">
                  <use xlinkHref={`${sprite}#icon-user`} />
                </svg>
              </NavLink>
            ) : (
              <button
                className="header__link"
                onClick={() => setIsAuthOpen(true)}
              >
                <span className="header__link-text header__link-text--user">
                  Войти
                </span>
                <svg className="header__icon-user" width="24" height="24">
                  <use xlinkHref={`${sprite}#icon-user`} />
                </svg>
              </button>
            )}
          </div>
        </div>
      </header>

      {isAuthOpen && (
        <AuthForm
          onClose={() => setIsAuthOpen(false)}
        />
      )}
      {isMobileSearchOpen && (
        <>
          <div className="header__overlay" onClick={handleClearSearch} />

          <div className="header__mobile-search" ref={searchRef}>
            <svg
              className="header__mobile-icon-search"
              width="24"
              height="24"
              aria-hidden="true"
            >
              <use xlinkHref={`${sprite}#icon-search`}></use>
            </svg>
            <input
              className="header__mobile-field"
              type="text"
              placeholder="Поиск"
              value={searchQuery}
              onChange={handleSearchInputChange}
              autoFocus
            />

            <button
              className="header__mobile-close"
              onClick={handleClearSearch}
            >
              <svg width="24" height="24">
                <use xlinkHref={`${sprite}#close-icon`} />
              </svg>
            </button>
          </div>
        </>
      )}
    </>
  );
}
