// index.js
import { navbarComponent } from "./components/navbar.js";
import { fetchTopSellingProducts } from "./components/carousel.js";
import { cartComponent } from "./components/cart.js";
import { addItemToCart, updateCartDisplay } from "./pages/items/items.js";
import { loadCoupons } from "./components/coupon.js";

let navContainer = document.querySelector('header');
let cartContainer =document.getElementById('cartContainer');


window.addEventListener('load', () => {
    // Cargar el componente de la barra de navegación
    navContainer.innerHTML = navbarComponent;

     // Cargar el offcanvas del carrito
    cartContainer.innerHTML = cartComponent;


    loadCoupons();

    // Cargar los productos más vendidos en el carrusel
    fetchTopSellingProducts();
    // Actualizar la visualización del carrito al cargar la página
    updateCartDisplay();
    // Configurar eventos una vez que el cupón está en el DOM
    const discountBanner = document.getElementById("discountBanner");
    const closeBanner = document.getElementById("closeBanner");
    if (discountBanner) {
        discountBanner.addEventListener("click", () => {
            const discountModal = new bootstrap.Modal(document.getElementById("discountModal"));
            discountModal.show();
        });

        closeBanner.addEventListener("click", (event) => {
            event.stopPropagation();
            discountBanner.style.display = "none";
        });
    }

    // Selecciona el ícono del carrito en el navbar y configura el listener
    const cartIcon = document.getElementById('cartIcon');
    const offcanvasCart = new bootstrap.Offcanvas(document.getElementById('offcanvasRight'));

    cartIcon.addEventListener('click', (event) => {
        event.preventDefault();
        offcanvasCart.show();
    });
    
});
