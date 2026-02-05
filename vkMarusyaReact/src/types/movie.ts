export interface Movie {
  id: number;
  title: string;
  originalTitle?: string;
  budget?: string;
  language?: string;
  releaseYear: number;
  releaseDate?: string;
  genres: string[];
  plot?: string;
  runtime: number;
  posterUrl?: string;
  backdropUrl?: string;
  trailerUrl?: string;
  trailerYoutubeId?: string;
  tmdbRating: number;
  revenue?: string;
  homepage?: string;
  status?: string;
  searchL?: string;
  keywords?: string[];
  countriesOfOrigin?: string[];
  languages?: string[];
  cast?: string[];
  director?: string; 
  production?: string;
  awardsSummary?: string;    
}