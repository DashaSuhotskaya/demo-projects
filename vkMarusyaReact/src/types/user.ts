import type { Movie } from "./movie";

export interface User {
    name: string;
    surname: string;
    email: string;
    favorites: Movie[];
  }
  