import { api } from "./axios";

export const getMovies = (params?: Record<string, any>) =>
  api.get("/movie", { params });

export const getTop10Movies = () =>
  api.get("/movie/top10");

export const getGenres = () =>
  api.get("/movie/genres");

export const getMovieById = (id: number) =>
  api.get(`/movie/${id}`);

export const getRandomMovie = () =>
  api.get("/movie/random");
