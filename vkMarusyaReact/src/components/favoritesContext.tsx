import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Movie } from "../types/movie";
import { getFavorites, addToFavorites, removeFromFavorites } from "../api/favorites";
import { useAuth } from "./AuthContext";

interface FavoritesContextType {
  favorites: Movie[];
  toggleFavorite: (movie: Movie) => Promise<void>;
  isFavorite: (movieId: number) => boolean;
  fetchFavorites: () => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const { user } = useAuth();

  const fetchFavorites = async () => {
    try {
      const data = await getFavorites();
      setFavorites(data);
    } catch {
      setFavorites([]);
    }
  };

  useEffect(() => {
    if (user) {
      fetchFavorites();
    } else {
      setFavorites([]);
    }
  }, [user]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const toggleFavorite = async (movie: Movie) => {
    const isExist = favorites.some((m) => m.id === movie.id);

    try {
      if (isExist) {
        await removeFromFavorites(movie.id);
        setFavorites((prev) => prev.filter((m) => m.id !== movie.id));
      } else {
        await addToFavorites(movie.id);
        setFavorites((prev) => [...prev, movie]);
      }
    } catch (err) {
      console.error("Ошибка при обновлении избранного", err);
    }
  };

  const isFavorite = (movieId: number) => favorites.some((m) => m.id === movieId);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, fetchFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }

  return context;
};
