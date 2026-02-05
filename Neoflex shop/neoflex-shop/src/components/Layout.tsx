import { Header } from "./Header";
import { Footer } from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
  basketCount: number;
  favoritesCount: number;
}

export function Layout({ children, basketCount, favoritesCount }: LayoutProps) {
  return (
    <div className="layout">
        <Header basketCount={basketCount} favoritesCount={favoritesCount} />
            <main className="main">{children}</main>
        <Footer />
    </div>
  );
}
