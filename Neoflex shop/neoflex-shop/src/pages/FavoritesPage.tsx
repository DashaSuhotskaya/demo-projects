import { CartItem } from "../components/CartItem";
import type { Headphone } from "../components/HeadphoneCard";

interface FavoritesPageProps {
  favorites: Headphone[];
  onRemove: (id: string) => void;
}

export function FavoritesPage({ favorites, onRemove }: FavoritesPageProps) {
  return (
    <section className="basketPage">
      <div className="container">
        <h1 className="basketPage__title">Избранное</h1>
        <ul className="basketPage__list">
          {favorites.length > 0 ? (
            favorites.map((item) => (
              <CartItem 
                key={item.id} 
                item={item} 
                type="favorites" 
                onRemove={onRemove} 
              />
            ))
          ) : (
            <p className="basketPage__empty">В избранном пока ничего нет</p>
          )}
        </ul>
      </div>
    </section>
  );
}
