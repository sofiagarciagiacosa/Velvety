export const cartItemComponent = (imgSrc, title, price, quantity) => {
    return `
        <div class="cart-item d-flex align-items-center mb-3">
            <img src="${imgSrc}" class="cart-item-img" alt="${title}" style="width: 50px; height: 50px; margin-right: 10px;">
            <div class="cart-item-details flex-grow-1">
                <h6 class="cart-item-title  mb-1">${title}</h6>
                <p class="card-text mb-1">Precio: $${price}</p>
                <div class="cart-item-quantity-controls d-flex align-items-center">
                    <button class="btn btn-sm btn-outline-secondary decrease-quantity"  data-title="${title}">-</button>
                    <span class="cart-item-quantity mx-2">${quantity}</span>
                    <button class="btn btn-sm btn-outline-secondary increase-quantity"  data-title="${title}">+</button>
                </div>
            </div>
            <span class="remove-item card-text" data-title="${title}">Eliminar</span>
        </div>
    `;
};
