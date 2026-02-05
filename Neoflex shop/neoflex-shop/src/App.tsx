import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { CatalogPage } from "./pages/CatalogPage";
import { useState } from "react";
import type { Headphone } from "./components/HeadphoneCard";
import { BasketPage } from "./pages/BasketPage";
import { FavoritesPage } from "./pages/FavoritesPage";

export interface BasketItem extends Headphone {
  count: number;
}

export function App() {
  const [cart, setCart] = useState<BasketItem[]>(() => {
    const savedCart = sessionStorage.getItem("basket");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [favorites, setFavorites] = useState<Headphone[]>(() => {
    const saved = sessionStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const toggleFavorite = (product: Headphone) => {
    const isExist = favorites.some((fav) => fav.id === product.id);
    let newFavorites;

    if (isExist) {
      newFavorites = favorites.filter((fav) => fav.id !== product.id);
    } else {
      newFavorites = [...favorites, product];
    }

    setFavorites(newFavorites);
    sessionStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  const addToBasket = (product: Headphone) => {
    setCart((prevCart) => {
      const isExist = prevCart.find((item) => item.id === product.id);
      let newCart;

      if (isExist) {
        newCart = prevCart.map((item) =>
          item.id === product.id ? { ...item, count: item.count + 1 } : item
        );
      } else {
        newCart = [...prevCart, { ...product, count: 1 }];
      }

      sessionStorage.setItem("basket", JSON.stringify(newCart));
      return newCart;
    });
  };

  const updateCount = (id: string, delta: number) => {
    setCart((prevCart) => {
      const newCart = prevCart
        .map((item) =>
          item.id === id ? { ...item, count: item.count + delta } : item
        )
        .filter((item) => item.count > 0);

      sessionStorage.setItem("basket", JSON.stringify(newCart));
      return newCart;
    });
  };

  const removeFromBasket = (id: string) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
    sessionStorage.setItem("basket", JSON.stringify(newCart));
  };

  return (
    <Layout basketCount={cart.length} favoritesCount={favorites.length}>
      <Routes>
        <Route
          path="/"
          element={
            <CatalogPage
              onBuyClick={addToBasket}
              onFavoriteClick={toggleFavorite}
              favorites={favorites}
            />
          }
        />
        <Route
          path="/basket"
          element={
            <BasketPage
              cart={cart}
              onRemove={removeFromBasket}
              onUpdateCount={updateCount}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <FavoritesPage
              favorites={favorites}
              onRemove={(id) => {
                const item = favorites.find((fav) => fav.id === id);
                if (item) toggleFavorite(item);
              }}
            />
          }
        />
      </Routes>
    </Layout>
  );
}
