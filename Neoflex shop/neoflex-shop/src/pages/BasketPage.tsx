import type { BasketItem } from "../App";
import { CartItem } from "../components/CartItem";
interface BasketPageProps {
  cart: BasketItem[];
  onRemove: (id: string) => void;
  onUpdateCount: (id: string, delta: number) => void;
}

export function BasketPage({ cart, onRemove, onUpdateCount }: BasketPageProps) {
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.count, 0);
  return (
    <>
      <section className="basketPage">
        <div className="container">
          <h1 className="basketPage__title">Корзина</h1>
          <div className="basketPage__wrapper">
            <ul className="basketPage__list">
            {cart.map((item) => (
        <CartItem 
          key={item.id} 
          item={item} 
          type="basket" 
          onRemove={onRemove} 
          onUpdateCount={onUpdateCount} 
        />
      ))}
            </ul>
            <div className="basketPage__total">
                <span className="basketPage__total-text">ИТОГО</span>
                <span className="basketPage__total-price">₽ {totalPrice}</span>
                <button className="basketPage__total-btn">Перейти к оформлению</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
