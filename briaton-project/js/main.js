import getCatalog from "./components/getCatalog.js";
import getLocationCity from "./components/getLocationCity.js";
import getCards from "./components/getCards.js";
import getProducts from "./components/getProducts.js";
import updateFilterCounts from "./components/updateFilterCounts.js";
import getFiltersAndSort from "./components/getFiltersAndSort.js";
import getBasket from "./components/getBasket.js";
import getAccordions from "./components/getAccordions.js";
import slider from "./components/slider.js";
import getValidator from "./components/getValidator.js";

window.addEventListener("DOMContentLoaded", async () => {
  getCatalog();
  getLocationCity();

  const checkboxes = document.querySelectorAll(
    ".catalog-form .custom-checkbox__field"
  );

  const products = await getProducts();
  updateFilterCounts(checkboxes, products);
  getFiltersAndSort(products);

  getCards(products);
  getBasket(products);
  getAccordions();
  slider(products);

  getValidator();
});
