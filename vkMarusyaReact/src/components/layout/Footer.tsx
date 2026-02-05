import sprite from "../../assets/sprite.svg";

export function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer__wrapper">
            <a href="https://vk.com" className="footer__link" aria-label="VK">
              <svg width="36" height="36">
                <use href={`${sprite}#icon-vk`} />
              </svg>
            </a>
            <a href="https://youtube.com" className="footer__link" aria-label="YouTube">
              <svg width="36" height="36">
                <use href={`${sprite}#icon-youtube`} />
              </svg>
            </a>
            <a href="https://ok.com" className="footer__link" aria-label="Ok">
              <svg width="36" height="36">
                <use href={`${sprite}#icon-ok`} />
              </svg>
            </a>
            <a href="https://web.telegram.org" className="footer__link" aria-label="Telegram">
              <svg>
                <use href={`${sprite}#icon-tg`} />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
