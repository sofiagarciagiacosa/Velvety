import { cardComponent } from "./card.js";

export async function fetchTopSellingProducts() {
    try {
        // Cargar los datos desde el archivo JSON
        const response = await fetch('/products.json');
        
        if (!response.ok) {
            throw new Error("Error en la respuesta de la solicitud");
        }

        const data = await response.json();

        // Combinar todos los productos de todas las categorías en un solo array
        const allProducts = data.flatMap(category => category.productos);

        // Ordenar los productos por cantidad de ventas en orden descendente
        const topSellingProducts = allProducts
            .sort((a, b) => b.soldQuantity - a.soldQuantity)
            .slice(0, 6); // Seleccionar los primeros 6 productos más vendidos

        // Generar el HTML de las tarjetas agrupadas en grupos de tres
        let cardsHtml = '';
        for (let i = 0; i < topSellingProducts.length; i += 3) {
            const group = topSellingProducts.slice(i, i + 3); // Obtiene un grupo de hasta 3 productos
            const activeClass = i === 0 ? 'active' : ''; // Solo el primer grupo será activo

            cardsHtml += `
                <div class="carousel-item ${activeClass}">
                    <div class="row row-cols-1 row-cols-md-3 g-4">
                        ${group.map(card => {
                            return `<div class="col">
                                ${cardComponent(card.imgSrc, card.title, card.text, `Comprar - $${card.price}`)}
                            </div>`;
                        }).join('')}
                    </div>
                </div>
            `;
        }

        // Insertar las tarjetas en el contenedor del carrusel
        const carouselInner = document.getElementById('carouselInner');
        if (carouselInner) {
            carouselInner.innerHTML = cardsHtml;
        }
    } catch (error) {
        console.error("Error al cargar los productos:", error);
    }
}
