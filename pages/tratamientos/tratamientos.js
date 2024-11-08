import { navbarComponent } from "/components/navbar.js";
import { cardComponent } from "/components/card.js";
import { cartComponent } from "/components/cart.js";

let navContainer = document.querySelector('header');
let cardContainer = document.getElementById('cardContainer');
let cartContainer =document.getElementById('cartContainer');

window.addEventListener('load', () => {
    // Inserta el navbar
    navContainer.innerHTML = navbarComponent;
     // Cargar el offcanvas del carrito
    cartContainer.innerHTML = cartComponent;

    // Obtiene y renderiza los productos de hidratación
    fetchProducts();

    // Selecciona el ícono del carrito en el navbar y configura el listener
    const cartIcon = document.getElementById('cartIcon');
    const offcanvasCart = new bootstrap.Offcanvas(document.getElementById('offcanvasRight'));

    cartIcon.addEventListener('click', (event) => {
        event.preventDefault();
        offcanvasCart.show();
    });
});

async function fetchProducts() {
    try {
        // Cargar los datos desde el archivo JSON
        const response = await fetch('/data/products.json');
        const data = await response.json();

        // Filtra los productos de la categoría "Hidratacion"
        const tratamientosProducts = data.find(category => category.categoria === "Tratamientos").productos;

        // Generar el HTML de las tarjetas
        let cardsHtml = `<div class="row row-cols-1 row-cols-md-3 g-4">`;
        cardsHtml += tratamientosProducts.map(card => {
            return cardComponent(card.imgSrc, card.title, card.text, `Comprar - $${card.price}`);
        }).join('');
        cardsHtml += `</div>`;

        // Inserta las tarjetas en el contenedor
        cardContainer.innerHTML = cardsHtml;
    } catch (error) {
        console.error("Error al cargar los productos:", error);
    }
}
