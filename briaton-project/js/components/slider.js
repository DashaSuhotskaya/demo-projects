import createProductCard from "./createProductCard.js";

export default function slider(products) {
  const dayProducts = products.filter((p) => Boolean(p.goodsOfDay) === true);
  const dayProductsList = document.querySelector(".day-products__list");

  dayProducts.forEach((product) => {
    const dayProductsItem = createProductCard(product);

    dayProductsItem.className = "day-products__item swiper-slide";
    dayProductsList.append(dayProductsItem);
  });

  const swiper = new Swiper(".swiper", {
    speed: 400,
    spaceBetween: 40,
    slidesPerView: 4,

    navigation: {
      nextEl: ".day-products__navigation-btn--next",
      prevEl: ".day-products__navigation-btn--prev",
    },
  });
}
