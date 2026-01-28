import { api } from "./axios"; 

export const getFavorites = () => 
  api.get('/favorites').then(response => response.data);

export const addToFavorites = (movieId: number) =>
  api.post('/favorites', { id: movieId.toString() });

export const removeFromFavorites = (movieId: number) =>
  api.delete(`/favorites/${movieId}`);