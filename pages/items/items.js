import { getData, setData } from "../../utils/localStorage.js";
import { cartItemComponent } from "../../components/cartItem.js";
import { cartComponent } from "../../components/cart.js";

document.getElementById('cartContainer').innerHTML = cartComponent;


// Función para cargar cupones desde el JSON
export async function loadCouponsForCart() {
    try {
        const response = await fetch('../../data/coupons.json');
        if (!response.ok) throw new Error('No se pudo cargar el archivo JSON');
        const coupons = await response.json();
        console.log(coupons); // Verifica si los cupones están siendo cargados correctamente
        return coupons;
    } catch (error) {
        console.error('Error al cargar cupones:', error);
        return [];
    }
}


// Función para aplicar el descuento y calcular el total
export async function applyCouponAndCalculateTotal(couponCode) {
    const cartItems = getData("cartItems") || [];
    let total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Cargar los cupones
    const coupons = await loadCouponsForCart(); 

    const coupon = coupons.find(coupon => coupon.code === couponCode);
    if (!coupon) {
        alert("Cupón no válido");
        return total;
    }


    if (coupon.discount === "Envío Gratis" && total >= 40000) {
        alert("¡Envío gratis aplicado!");
        return total; 
    }

    if (coupon.discount !== "Envío Gratis") {
        if (total >= (coupon.minAmount || 0)) {
            const discount = (total * coupon.discount) / 100;
            alert(`¡Descuento de ${coupon.discount}% aplicado!`);

            // Guardar el cupón aplicado
            setData("appliedCoupon", couponCode);
            updateCouponMessage(couponCode);
            

            return total - discount;
        } else {
            alert("No cumples con las condiciones del cupón");
        }
    }

    return total;
}
function updateCouponMessage(couponCode) {
    const couponMessage = document.getElementById("appliedCouponMessage");
    const removeCouponBtn = document.getElementById("removeCoupon");
    if (couponText && removeCouponBtn) {
        couponText.textContent = `Cupón en uso: ${couponCode}`;
        removeCouponBtn.style.display = "inline"; // Mostrar el botón de eliminar
    }
}
// Función para eliminar el cupón
// Función para eliminar el cupón
function removeCoupon() {
    const couponText = document.getElementById("couponText");
    const removeCouponBtn = document.getElementById("removeCoupon");

    if (couponText && removeCouponBtn) {
        couponText.textContent = ""; // Limpiar mensaje
        removeCouponBtn.style.display = "none"; // Ocultar botón
    }

    // Eliminar el cupón del localStorage
    setData("appliedCoupon", null);

    // Recalcular el total sin descuento
    const cartItems = getData("cartItems") || [];
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    updateCartTotal(total);
}

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
export function updateCartTotal(totalConDescuento = null) {
    const items = getData("cartItems") || [];
    const total = totalConDescuento !== null ? totalConDescuento : items.reduce((sum, item) => sum + item.price * item.quantity, 0);
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
    
    updateCartDisplay();
    
});
document.addEventListener('DOMContentLoaded', () => {
    const applyDiscountButton = document.getElementById('applyDiscount');
    if (applyDiscountButton) {
        applyDiscountButton.addEventListener('click', async () => {
            const couponCode = document.getElementById('discountCode').value.trim();
            const totalConDescuento = await applyCouponAndCalculateTotal(couponCode);
            updateCartTotal(totalConDescuento);
        });
    }
    const removeCouponBtn = document.getElementById("removeCoupon");
    if (removeCouponBtn) {
        removeCouponBtn.addEventListener("click", removeCoupon);
    }
});


