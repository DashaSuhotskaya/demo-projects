import { HeadphoneCard, type Headphone } from "../components/HeadphoneCard";

import headphone1 from "../assets/img/headphone1.png";
import headphone2 from "../assets/img/headphone2.png";
import headphone3 from "../assets/img/headphone3.png";
import headphone4 from "../assets/img/headphone4.png";
import headphone5 from "../assets/img/headphone5.png";
import headphone6 from "../assets/img/headphone6.png";

const headphones = [
  {
    id: "h1",
    img: headphone1,
    title: "Apple BYZ S852I",
    price: 2927,
    old_price: 3527,
    rate: 4.7,
  },
  {
    id: "h2",
    img: headphone2,
    title: "Apple EarPods",
    price: 2327,
    rate: 4.5,
  },
  {
    id: "h3",
    img: headphone3,
    title: "Apple EarPods",
    price: 2327,
    rate: 4.5,
  },
  {
    id: "h4",
    img: headphone1,
    title: "Apple BYZ S852I",
    price: 2927,
    rate: 4.7,
  },
  {
    id: "h5",
    img: headphone2,
    title: "Apple EarPods",
    price: 2327,
    rate: 4.5,
  },
  {
    id: "h6",
    img: headphone3,
    title: "Apple EarPods",
    price: 2327,
    rate: 4.5,
  },
];

const wirelessHeadphones = [
  {
    id: "h7",
    img: headphone4,
    title: "Apple AirPods",
    price: 9527,
    rate: 4.7,
  },
  {
    id: "h8",
    img: headphone5,
    title: "GERLAX GH-04",
    price: 6527,
    rate: 4.7,
  },
  {
    id: "h9",
    img: headphone6,
    title: "BOROFONE BO4",
    price: 7527,
    rate: 4.7,
  },
];

interface CatalogPageProps {
  onBuyClick: (product: Headphone) => void;
  onFavoriteClick: (product: Headphone) => void;
  favorites: Headphone[];
}

export function CatalogPage({
  onBuyClick,
  onFavoriteClick,
  favorites,
}: CatalogPageProps) {
  const isFavorite = (product: Headphone) =>
    favorites.some((fav) => fav.id === product.id);
  return (
    <>
      <section className="catalogPage">
        <div className="container">
          <h1 className="catalogPage__title visually-hidden">Каталог</h1>
          <h2 className="catalogPage__title-chapter">Наушники</h2>
          <div className="catalogPage__wrapper">
            {headphones.map((headphone) => (
              <HeadphoneCard
                key={headphone.id}
                headphone={headphone}
                onBuy={() => onBuyClick(headphone)}
                onFavorite={() => onFavoriteClick(headphone)}
                isFavorite={isFavorite(headphone)}
              />
            ))}
          </div>
          <h2 className="catalogPage__title-chapter">Беспроводные наушники</h2>
          <div className="catalogPage__wrapper">
            {wirelessHeadphones.map((headphone) => (
              <HeadphoneCard
                key={headphone.id}
                headphone={headphone}
                onBuy={() => onBuyClick(headphone)}
                onFavorite={() => onFavoriteClick(headphone)}
                isFavorite={isFavorite(headphone)}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
