import getCards from "./getCards.js";

export default function getFiltersAndSort(products) {
  const checkboxes = document.querySelectorAll(
    ".catalog-form .custom-checkbox__field"
  );
  const statusRadios = document.querySelectorAll('input[name="status"]');
  const catalogSort = document.querySelector(".catalog__sort-select");
  const resetBtn = document.querySelector(".catalog-form__reset");

  let currentSort = null;

  function applyFiltersAndSort() {
    let filtered = [...products];

    const selectedTypes = Array.from(checkboxes)
      .filter((cb) => cb.checked)
      .map((cb) => cb.value);

    const statusRadio = document.querySelector('input[name="status"]:checked');
    const showOnlyInStock = statusRadio.value === "instock";

    if (selectedTypes.length > 0) {
      filtered = filtered.filter((p) =>
        p.type.some((type) => selectedTypes.includes(type))
      );
    }

    if (showOnlyInStock) {
      filtered = filtered.filter(
        (p) =>
          p.availability.moscow > 0 ||
          p.availability.orenburg > 0 ||
          p.availability.saintPetersburg > 0
      );
    }

    switch (currentSort) {
      case "price-min":
        filtered.sort((a, b) => a.price.new - b.price.new);
        break;
      case "price-max":
        filtered.sort((a, b) => b.price.new - a.price.new);
        break;
      case "rating-max":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
    }

    getCards(filtered);
  }

  checkboxes.forEach((cb) =>
    cb.addEventListener("change", applyFiltersAndSort)
  );
  statusRadios.forEach((radio) =>
    radio.addEventListener("change", applyFiltersAndSort)
  );

  catalogSort.addEventListener("change", function () {
    currentSort = this.value;
    applyFiltersAndSort();
  });

  resetBtn.addEventListener("click", () => {
    checkboxes.forEach((cb) => (cb.checked = false));
    statusRadios.forEach((r) => (r.checked = r.value === "all"));
    catalogSort.value = "";
    currentSort = null;
    getCards(products);
  });
}