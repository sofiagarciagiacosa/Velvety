import { navbarComponent } from "/components/navbar.js";
import { cardComponent } from "/components/card.js";
import { cartComponent } from "/components/cart.js";
import { cartItemComponent } from "../../components/cartItem.js";
import { addItemToCart, updateCartDisplay } from "../items/items.js";

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
        const hidratacionProducts = data.find(category => category.categoria === "Hidratacion").productos;

        // Generar el HTML de las tarjetas
        let cardsHtml = `<div class="row row-cols-1 row-cols-md-3 g-4">`;
        cardsHtml += hidratacionProducts.map(product => {
            return `
                <div class="col">
                    ${cardComponent(product.imgSrc, product.title, product.text, "Comprar", product.price)}
                </div>
            `;
        }).join('');
        cardsHtml += `</div>`;

        // Inserta las tarjetas en el contenedor
        cardContainer.innerHTML = cardsHtml;

        // Selecciona todos los botones de "Comprar" y agrega el evento para abrir el carrito
        const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
        const offcanvasCart = new bootstrap.Offcanvas(document.getElementById('offcanvasRight'));

        addToCartButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();

                const product = {
                    imgSrc: button.getAttribute('data-imgsrc'),
                    title: button.getAttribute('data-title'),
                    price: parseFloat(button.getAttribute('data-price')),
                };

                addItemToCart(product);
                offcanvasCart.show();
            });
        });
        
        updateCartDisplay()

    } catch (error) {
        console.error("Error al cargar los productos:", error);
    }
}
