import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router/AppRouter";
import { FavoritesProvider } from "./components/favoritesContext";
import { AuthProvider } from "./components/AuthContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <FavoritesProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </FavoritesProvider>
    </AuthProvider>
  </StrictMode>
);
