import type { Headphone } from "./HeadphoneCard";
import sprite from "../assets/sprite.svg";

interface ProductModalProps {
  item: Headphone;
  onClose: () => void;
  onBuy: () => void;
}

export function ProductModal({ item, onClose, onBuy }: ProductModalProps) {
  return (
    <div className="modal__overlay" onClick={onClose}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}>
          <svg width="20" height="17">
            <use xlinkHref={`${sprite}#icon-delete`}></use>
          </svg>
        </button>

        <div className="modal__body">
          <img src={item.img} alt={item.title} className="modal__img" />

          <div className="modal__info">
            <h2 className="modal__title">{item.title}</h2>
            <p className="modal__price">{item.price} ₽</p>

            <div className="modal__description">
              <h3 className="modal__description-text">Описание:</h3>
              <p className="modal__description-text">
                Превосходное качество звука и эргономичный дизайн для вашего
                комфорта.
              </p>
            </div>

            <button
              className="modal__buy-btn"
              onClick={() => {
                onBuy();
                onClose();
              }}
            >
              Добавить в корзину
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
