import { useState } from "react";
import sprite from "../assets/sprite.svg";
import { ProductModal } from "./ProductModal";

export interface Headphone {
  id: string;
  img: string;
  title: string;
  price: number;
  old_price?: number;
  rate: number;
}

interface HeadphoneCardProps {
  headphone: Headphone;
  onBuy: () => void;
  onFavorite: () => void;
  isFavorite: boolean;
}

export function HeadphoneCard({
  headphone,
  onBuy,
  onFavorite,
  isFavorite,
}: HeadphoneCardProps) {
  const { img, title, price, old_price, rate } = headphone;
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="catalogPage__card">
      <button className="catalogPage__modal" onClick={() => setIsModalOpen(true)}>
        <img src={img} alt={title} className="catalogPage__card-image" />
      </button>
      <div className="catalogPage__card-content-wrapper">
        <div className="catalogPage__card-top">
          <span className="catalogPage__card-title">{title}</span>
          <span className="catalogPage__card-price">{price} P</span>
          {old_price && (
            <span className="catalogPage__card-old-price">{old_price} P</span>
          )}
        </div>
        <div className="catalogPage__card-bottom">
          <div className="catalogPage__card-rate">
            <svg
              className="catalogPage__card-rate-icon"
              viewBox="0 0 24 22"
              aria-hidden="true"
            >
              <use xlinkHref={`${sprite}#icon-star`}></use>
            </svg>
            <span className="catalogPage__card-rate-text">{rate}</span>
          </div>
          <div className="catalogPage__card-btns">
            <button className="catalogPage__card-modal" onClick={() => setIsModalOpen(true)}>
              <svg
                className="catalogPage__icon-modal"
                viewBox="0 0 15 15"
                aria-hidden="true"
                width={15}
                height={15}
              >
                <use xlinkHref={`${sprite}#plus`}></use>
              </svg>
            </button>
            <button className="catalogPage__card-favorite" onClick={onFavorite}>
              <svg
                className={`catalogPage__icon-favorite ${
                  isFavorite ? "is-active" : ""
                }`}
                viewBox="0 0 22 20"
                aria-hidden="true"
              >
                <use xlinkHref={`${sprite}#icon-like`}></use>
              </svg>
            </button>
            <button className="catalogPage__card-buy" onClick={onBuy}>
              Купить
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <ProductModal 
          item={headphone} 
          onClose={() => setIsModalOpen(false)} 
          onBuy={onBuy} 
        />
      )}
    </div>
  );
}
