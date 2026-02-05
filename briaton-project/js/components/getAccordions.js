export default function getAccordions() {
  const accordionsBtn = document.querySelectorAll(".accordion__btn");

  accordionsBtn.forEach((accordion) => {
    accordion.addEventListener("click", function (e) {
      const isActive = accordion.classList.contains("accordion__btn--active");

      accordionsBtn.forEach((el) =>
        el.classList.remove("accordion__btn--active")
      );

      if (!isActive) {
        accordion.classList.add("accordion__btn--active");
      }
    });
  });
}
