export default function getBasket(products) {
  const headerBtn = document.querySelector(".header__user-btn");
  const basket = document.querySelector(".basket");
  const basketList = document.querySelector(".basket__list");
  const basketCount = document.querySelector(".header__user-count");
  const emptyBlock = document.querySelector('.basket__empty-block');
  const catalogList = document.querySelector('.catalog__list');

  headerBtn.addEventListener("click", () => {
    basket.classList.toggle("basket--active");
  });

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".product-card__link");
    if (!btn) return;

    e.preventDefault();
    const productId = btn.dataset.id;
    const product = products.find((p) => String(p.id) === productId);
    addProductToBasket(product);
  });

  function addProductToBasket(product) {
    const basketEl = document.createElement("li");
    basketEl.className = "basket__item";
    basketEl.innerHTML = `
      <div class="basket__img">
        <img src="${product.image}" alt="Фотография товара" height="60" width="60">
      </div>
      <span class="basket__name">${product.name}</span>
      <span class="basket__price">${product.price.new} руб</span>
      <button class="basket__close" type="button">
        <svg class="main-menu__icon" width="24" height="24" aria-hidden="true">
          <use xlink:href="images/sprite.svg#icon-close"></use>
        </svg>
      </button>
    `;
    basketList.append(basketEl);

    const basketCloseBtn = basketEl.querySelector(".basket__close");
    basketCloseBtn.addEventListener("click", () => {
      basketEl.remove();
      updateBasketCount();
    });

    updateBasketCount();
  }

  function updateBasketCount() {
    basketCount.textContent = basketList.children.length;
    emptyBlock.style.display = basketList.children.length ? "none" : "block";
  }

  updateBasketCount();
}
