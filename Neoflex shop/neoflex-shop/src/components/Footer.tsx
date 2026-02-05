import { Link } from "react-router-dom";
import sprite from "../assets/sprite.svg";
import { useState } from "react";

export function Footer() {
  const [lang, setLang] = useState("Рус");
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer__wrapper">
            <Link to="/" className="footer__logo">
              <svg
                className="footer__icon-logo"
                viewBox="0 0 84 22"
                aria-hidden="true"
              >
                <use xlinkHref={`${sprite}#icon-logo`}></use>
              </svg>
            </Link>
            <div className="footer__menu-left">
              <Link to="/favorites" className="footer__link">
                Избранное
              </Link>
              <Link to="/basket" className="footer__link">
                Корзина
              </Link>
              <Link to="/contacts" className="footer__link">
                Контакты
              </Link>
            </div>
            <div className="footer__menu-right">
              <Link to="/services" className="footer__link">
                Условия сервиса
              </Link>
              <div className="footer__languages">
                <button className="footer__btn">
                  <svg
                    className="footer__icon-language"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <use xlinkHref={`${sprite}#icon-language`}></use>
                  </svg>
                </button>
                <button
                  className={`footer__btn ${lang === "Рус" ? "is-active" : ""}`}
                  onClick={() => setLang("Рус")}
                >
                  Рус
                </button>

                <button
                  className={`footer__btn ${lang === "Eng" ? "is-active" : ""}`}
                  onClick={() => setLang("Eng")}
                >
                  Eng
                </button>
              </div>
            </div>
            <div className="footer__social">
              <a
                className="footer__social-link"
                href="https://vk.com"
                target="_blank"
              >
                <svg
                  className="footer__icon-vk"
                  viewBox="0 0 31 21"
                  aria-hidden="true"
                >
                  <use xlinkHref={`${sprite}#icon-vk`}></use>
                </svg>
              </a>
              <a
                className="footer__social-link"
                href="https://web.telegram.org/k/"
                target="_blank"
              >
                <svg
                  className="footer__icon-tg"
                  viewBox="0 0 31 31"
                  aria-hidden="true"
                >
                  <use xlinkHref={`${sprite}#icon-tg`}></use>
                </svg>
              </a>
              <a
                className="footer__social-link"
                href="https://web.whatsapp.com/"
                target="_blank"
              >
                <svg
                  className="footer__icon-whatsapp"
                  viewBox="0 0 31 31"
                  aria-hidden="true"
                >
                  <use xlinkHref={`${sprite}#icon-whatsapp`}></use>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
