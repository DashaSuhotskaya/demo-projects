import { Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { Layout } from "../components/layout/Layout";
import { GenresPage } from "../pages/GenresPage";
import { GenrePage } from "../pages/GenrePage";
import { MoviePage } from "../pages/MoviePage";
import { ProfilePage } from "../pages/ProfilePage";

export function AppRouter() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/genres" element={<GenresPage />} />
        <Route path="/genres/:genre" element={<GenrePage />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Layout>
  );
}
