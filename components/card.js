export const cardComponent = (imgSrc, title, text, buttonLabel, price) => {
    return `
        <div class="col">
            <div class="card h-100">
                <img src="${imgSrc}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title" id="card-title-smaller">${title}</h5>
                    <p class="card-text">${text}</p>
                </div>
                <div class="card-footer">
                    <!-- Este es el botón que muestra el precio del producto y añade al carrito -->
                    <a href="#" class="btn btn-product add-to-cart-btn" 
                       data-imgsrc="${imgSrc}" 
                       data-title="${title}" 
                       data-price="${price}">
                       ${buttonLabel} - $${price}
                    </a>
                </div>
            </div>
        </div>
    `;
}