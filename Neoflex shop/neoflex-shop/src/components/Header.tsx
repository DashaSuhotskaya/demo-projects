import { Link } from "react-router-dom";
import sprite from "../assets/sprite.svg";

interface HeaderProps {
  basketCount: number;
  favoritesCount: number;
}

export function Header({ basketCount, favoritesCount }: HeaderProps) {
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Link to="/">
              <svg
                className="header__icon-logo"
                viewBox="0 0 84 22"
                aria-hidden="true"
              >
                <use xlinkHref={`${sprite}#icon-logo`}></use>
              </svg>
            </Link>
            <div className="header__btns">
              <Link to="/favorites">
                <div className="header__favorites">
                  <svg
                    className="header__icon-favorites"
                    viewBox="0 0 22 20"
                    aria-hidden="true"
                  >
                    <use xlinkHref={`${sprite}#icon-like`}></use>
                  </svg>
                  <span className="header__favorites-count">{favoritesCount}</span>
                </div>
              </Link>

              <Link to="/basket">
                <div className="header__basket">
                  <svg
                    className="header__icon-basket"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <use xlinkHref={`${sprite}#icon-basket`}></use>
                  </svg>
                  <span className="header__basket-count">{basketCount}</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
