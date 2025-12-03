export default function getCatalog() {
    const headerCatalogBtn = document.querySelector('.header__catalog-btn');
    const mainMenu = document.querySelector('.main-menu');
    const mainMenuCloseBtn = document.querySelector('.main-menu__close');
    headerCatalogBtn.addEventListener('click', function (e) {
        mainMenu.classList.add("main-menu--active");
    });

    mainMenuCloseBtn.addEventListener('click', function (e) {
        mainMenu.classList.remove("main-menu--active")
    });
}