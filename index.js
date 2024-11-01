// index.js
import { navbarComponent } from "./components/navbar.js";
import { fetchTopSellingProducts } from "./components/carousel.js";

let navContainer = document.querySelector('header');

window.addEventListener('load', () => {
    // Cargar el componente de la barra de navegación
    navContainer.innerHTML = navbarComponent;

    // Cargar los productos más vendidos en el carrusel
    fetchTopSellingProducts();
});
