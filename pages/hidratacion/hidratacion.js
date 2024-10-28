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
        title: 'Glow Masque',
        text: 'Mascarilla intensiva de hidratación con extractos naturales y ácido hialurónico.',
        buttonLabel: 'Comprar - $3,500'
    },
    {
        imgSrc: '/assets/cremaHidratante.webp',
        title: 'Aqua Cream',
        text: 'Crema facial de textura sedosa con una fórmula enriquecida que nutre y suaviza la piel.',
        buttonLabel: 'Comprar - $14,200'
    },
    {
        imgSrc: '/assets/serumHidratante.webp',
        title: 'Radiance Serum',
        text: 'Sérum ligero con vitamina C y ácido hialurónico',
        buttonLabel: 'Comprar - $13,800'
    },
    {
        imgSrc: '/assets/cremaManos.webp',
        title: 'Body Silk',
        text: 'Crema corporal ultra hidratante con manteca de karité y aceites esenciales.',
        buttonLabel: 'Comprar - $14,500'
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
