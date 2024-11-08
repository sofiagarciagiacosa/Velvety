// index.js
import { navbarComponent } from "./components/navbar.js";
import { fetchTopSellingProducts } from "./components/carousel.js";
import { cartComponent } from "./components/cart.js";

let navContainer = document.querySelector('header');
let cartContainer =document.getElementById('cartContainer');

window.addEventListener('load', () => {
    // Cargar el componente de la barra de navegación
    navContainer.innerHTML = navbarComponent;

     // Cargar el offcanvas del carrito
    cartContainer.innerHTML = cartComponent;

    // Cargar los productos más vendidos en el carrusel
    fetchTopSellingProducts();

    // Selecciona el ícono del carrito en el navbar y configura el listener
    const cartIcon = document.getElementById('cartIcon');
    const offcanvasCart = new bootstrap.Offcanvas(document.getElementById('offcanvasRight'));

    cartIcon.addEventListener('click', (event) => {
        event.preventDefault();
        offcanvasCart.show();
    });
    
});
