import { navbarComponent } from "/components/navbar.js";
import { cardComponent } from "/components/card.js";

let navContainer = document.querySelector('header');
let cardContainer = document.getElementById('cardContainer');

window.addEventListener('load', () => {
    // Inserta el navbar
    navContainer.innerHTML = navbarComponent;
    // Obtiene y renderiza los productos de hidratación
    fetchProducts();
});

async function fetchProducts() {
    try {
        // Cargar los datos desde el archivo JSON
        const response = await fetch('/products.json');
        const data = await response.json();

        const limpiezaProducts = data.find(category => category.categoria === "Limpieza").productos;

        // Generar el HTML de las tarjetas
        let cardsHtml = `<div class="row row-cols-1 row-cols-md-3 g-4">`;
        cardsHtml += limpiezaProducts.map(card => {
            return cardComponent(card.imgSrc, card.title, card.text, `Comprar - $${card.price}`);
        }).join('');
        cardsHtml += `</div>`;

        // Inserta las tarjetas en el contenedor
        cardContainer.innerHTML = cardsHtml;
    } catch (error) {
        console.error("Error al cargar los productos:", error);
    }
}
