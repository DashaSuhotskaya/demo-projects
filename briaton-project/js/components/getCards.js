import getProducts from "./getProducts.js";
import createProductCard from "./createProductCard.js";

export default function getCards(newProducts) {
  const catalogList = document.querySelector(".catalog__list");
  const paginationContainer = document.querySelector(".catalog__pagination");

  const cardsPerPage = 6;
  let currentPage = 1;
  let products = [];

  function renderCatalog(productsToRender) {
    catalogList.innerHTML = "";

    productsToRender.forEach((product) => {
      const card = createProductCard(product);
      catalogList.appendChild(card);
    });
  }

  function renderPagination(totalPages) {
    paginationContainer.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
      const pageBtn = document.createElement("button");
      pageBtn.classList.add("catalog__pagination-link");
      pageBtn.textContent = i;

      if (i === currentPage) {
        pageBtn.classList.add("catalog__pagination-link--active");
      }

      pageBtn.addEventListener("click", () => {
        currentPage = i;
        updateCatalog();
      });

      paginationContainer.appendChild(pageBtn);
    }
  }

  function updateCatalog() {
    const start = (currentPage - 1) * cardsPerPage;
    const end = start + cardsPerPage;
    const productsToRender = products.slice(start, end);

    renderCatalog(productsToRender);

    const totalPages = Math.ceil(products.length / cardsPerPage);
    if (totalPages > 1) {
      renderPagination(totalPages)
    } else {
    paginationContainer.innerHTML = ""
  };
  }

  if (newProducts) {
    products = newProducts;
    updateCatalog();
  } else {
    getProducts().then((loadedProducts) => {
      products = loadedProducts;
      updateCatalog();
    });
  }
}
