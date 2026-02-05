import sprite from "../assets/sprite.svg";
import type { Headphone } from "./HeadphoneCard";

interface CartItemProps {
  item: Headphone & { count?: number };
  type: "basket" | "favorites";
  onRemove: (id: string) => void;
  onUpdateCount?: (id: string, delta: number) => void;
}

export function CartItem({
  item,
  type,
  onRemove,
  onUpdateCount,
}: CartItemProps) {
  const isBasket = type === "basket";

  return (
    <li className="basketPage__item">
      <div className="basketPage__inner">
        
        <img src={item.img} alt={item.title} className="basketPage__img" />

        {isBasket && onUpdateCount && (
          <div className="basketPage__count">
            <button
              className="basketPage__counter"
              onClick={() => onUpdateCount(item.id, -1)}
            >
              <svg width="14" height="2">
                <use xlinkHref={`${sprite}#minus`}></use>
              </svg>
            </button>
            <span className="basketPage__count-text">{item.count}</span>
            <button
              className="basketPage__counter"
              onClick={() => onUpdateCount(item.id, 1)}
            >
              <svg width="14" height="14">
                <use xlinkHref={`${sprite}#plus`}></use>
              </svg>
            </button>
          </div>
        )}
      </div>

      <div className="basketPage__info">
        <h2 className="basketPage__cart-title">{item.title}</h2>
        <p className="basketPage__price">{item.price} ₽</p>
      </div>

      <button className="basketPage__remove" onClick={() => onRemove(item.id)}>
        <svg width="20" height="17">
          <use xlinkHref={`${sprite}#icon-delete`}></use>
        </svg>
      </button>

      {isBasket && (
        <span className="basketPage__price basketPage__price--second">
          {item.price * (item.count || 1)} ₽
        </span>
      )}
    </li>
  );
}
