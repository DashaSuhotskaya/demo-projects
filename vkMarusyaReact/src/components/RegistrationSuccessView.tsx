import sprite from "../assets/sprite.svg";

interface RegistrationSuccessViewProps {
  onLoginClick: () => void;
  onClose: () => void;
}

export function RegistrationSuccessView({ onLoginClick, onClose }: RegistrationSuccessViewProps) {
  return (
    <div className="authForm__wrapper" onClick={(e) => e.stopPropagation()}>
      <button className="authForm__btn authForm__btn--close" onClick={onClose}>
        <svg width="24" height="24">
          <use xlinkHref={`${sprite}#close-icon`} />
        </svg>
      </button>

      <svg className="authForm__icon-logo" width="133" height="30">
        <use xlinkHref={`${sprite}#logo-black`} />
      </svg>

      <h2 className="authForm__title">
        Регистрация завершена
      </h2>
      <p className="authForm__text-info">
        Используйте вашу электронную почту для входа
      </p>

      <button
        className="authForm__btn authForm__btn--login authForm__btn--login--success"
        onClick={onLoginClick}
      >
        Войти
      </button>
    </div>
  );
}
