import { navbarComponent } from "/components/navbar.js"
let  navContainer = document.querySelector('header')

window.addEventListener('load', () => {
    navContainer.innerHTML=navbarComponent
})


// pages/hidratacion/hidratacion.js
import { cardComponent } from "/components/card.js";

let cardContainer = document.getElementById('cardContainer');

// Definir los datos de las tarjetas
let cardData = [
    {
        imgSrc: '/assets/pexels-photo-4056460.webp',
        title: 'Card 1',
        text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
        buttonLabel: 'Go somewhere'
    },
    {
        imgSrc: '/assets/pexels-photo-1234567.webp',
        title: 'Card 2',
        text: 'Another example text for a different card.',
        buttonLabel: 'Learn more'
    },
    {
        imgSrc: '/assets/pexels-photo-7654321.webp',
        title: 'Card 3',
        text: 'More text content for the third card.',
        buttonLabel: 'Read more'
    }
    
];

window.addEventListener('load', () => {
  // Crear el contenedor de las filas
    let cardsHtml = `<div class="row row-cols-1 row-cols-md-3 g-4">`;

    // Recorrer `cardData` y generar cada tarjeta
    cardsHtml += cardData.map(card => {
        return cardComponent(card.imgSrc, card.title, card.text, card.buttonLabel);
    }).join('');

    // Cerrar el contenedor de las filas
    cardsHtml += `</div>`;

    // Insertar todas las tarjetas generadas en el contenedor
    cardContainer.innerHTML = cardsHtml;
});
