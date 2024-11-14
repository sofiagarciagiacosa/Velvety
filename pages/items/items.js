import { getData, setData } from "../../utils/localStorage.js";
import { cartItemComponent } from "../../components/cartItem.js";



// Agregar producto al carrito en localStorage
export function addItemToCart(product) {
    let items = getData('cartItems') || [];
    const existingProductIndex = items.findIndex(item => item.title === product.title);

    if (existingProductIndex >= 0) {
        items[existingProductIndex].quantity += 1;
    } else {
        items.push({ ...product, quantity: 1 });
    }

    setData('cartItems', items);
    updateCartDisplay();
}

// Actualizar el total del carrito en el DOM
function updateCartTotal() {
    const items = getData("cartItems") || [];
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById("cartTotal").textContent = total.toFixed(2);
}


// Actualizar la visualización del carrito en el DOM
export function updateCartDisplay() {
    const cartItemsContainer = document.getElementById("cartItemsContainer");
    const items = getData("cartItems") || [];

    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = items.map(item =>
            cartItemComponent(item.imgSrc, item.title, item.price, item.quantity)
        ).join("");
        
        updateCartTotal();

        // Configura los eventos para aumentar, disminuir cantidad y eliminar
        items.forEach((item, index) => {
            const increaseBtn = cartItemsContainer.querySelector(`[data-title="${item.title}"].increase-quantity`);
            const decreaseBtn = cartItemsContainer.querySelector(`[data-title="${item.title}"].decrease-quantity`);
            const deleteBtn = cartItemsContainer.querySelector(`[data-title="${item.title}"].remove-item`);

            if (increaseBtn) {
                increaseBtn.addEventListener('click', () => {
                    item.quantity += 1;
                    setData("cartItems", items);
                    updateCartDisplay();
                });
            }
            
            if (decreaseBtn) {
                decreaseBtn.addEventListener('click', () => {
                    if (item.quantity > 1) {
                        item.quantity -= 1;
                        setData("cartItems", items);
                        updateCartDisplay();
                    }
                });
            }

            if (deleteBtn) {
                deleteBtn.addEventListener('click', () => {
                    // Elimina el producto del array 'items' usando el índice
                    items.splice(index, 1);
                    setData("cartItems", items); // Guarda el array actualizado en localStorage
                    updateCartDisplay();          // Actualiza la visualización del carrito
                });
            }
        });
    }
}






// Inicializar el carrito al cargar la página
window.addEventListener('load', () => {
    updateCartDisplay();     // Mostrar el carrito actualizado al cargar la página
});


