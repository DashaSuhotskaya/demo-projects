import { Header } from "./Header";
import { Footer } from "./Footer";

interface Props {
  children: React.ReactNode;
}

export function Layout({ children }: Props) {
  return (
    <div className="layout">
        <Header />
            <main className="main">{children}</main>
        <Footer />
    </div>
  );
}
