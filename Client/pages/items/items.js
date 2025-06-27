import { getData, setData } from "../../utils/localStorage.js";
import { cartItemComponent } from "../../components/cartItem.js";
import { cartComponent } from "../../components/cart.js";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("cartContainer");
  if (container) {
    container.innerHTML = cartComponent;
  }
});


// Función para cargar cupones desde el JSON
export async function loadCouponsForCart() {
    try {
        const response = await fetch('/coupon');
        if (!response.ok) throw new Error('No se pudo cargar el archivo JSON');
        const coupons = await response.json();
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


    if (coupon.discount === "Envío Gratis") {
      if ( total >= coupon.minAmount){
        alert("¡Envío gratis aplicado!");
        return total; 
      }else {
        alert("No cumples con las condiciones del cupón");
        return total;
      }
      
        
    } 

    if (coupon.discount !== "Envío Gratis") {
        if (total >= (coupon.minAmount || 0)) {
            const discount = (total * coupon.discount) / 100;
            alert(`¡Descuento de ${coupon.discount}% aplicado!`);

            // Guardar el cupón aplicado
            const appliedCoupon = {
              ...coupon,
              _id: coupon._id?.$oid || coupon._id, // asegura que sea string
            };
            setData("appliedCoupon", appliedCoupon);
            
            updateCouponMessage(coupon.code);
            const user = JSON.parse(sessionStorage.getItem("userData"));
            if (user?.email) {
              try {
                await fetch("/coupon/apply", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email: user.email, code: coupon.code }),
                });
                
              } catch (err) {
                console.error("Error guardando cupón en el backend:", err);
              }
            }

            return total - discount;
        } else {
            alert("No cumples con las condiciones del cupón");
        }
    }

    return total;
}

function updateCouponMessage(couponCode) {
    const couponText = document.getElementById("couponText");
    const removeCouponBtn = document.getElementById("removeCoupon");

    if (couponText && removeCouponBtn) {
        couponText.textContent = `Cupón en uso: ${couponCode}`;
        removeCouponBtn.style.display = "inline";
        
        // Asegurar que se asigne el evento correctamente
        removeCouponBtn.removeEventListener("click", removeCoupon);
        removeCouponBtn.addEventListener("click", removeCoupon);
    }
}

// Función para eliminar el cupón
function removeCoupon() {
    console.log("Eliminando cupón...");
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
    updateCartTotal(total);  // Esto actualizará correctamente el total en el DOM
}

// Agregar producto al carrito en localStorage
export function addItemToCart(product) {
  console.log("Producto agregado al carrito:", product); // ⬅️ Verificá acá
  let items = getData("cartItems") || [];
  const existingProductIndex = items.findIndex(
    (item) => item.title === product.title
  );

  if (existingProductIndex >= 0) {
    items[existingProductIndex].quantity += 1;
  } else {
    items.push({ ...product, quantity: 1, _id: product._id });
  }

  setData("cartItems", items);
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
      cartItemsContainer.innerHTML = items
        .map((item) =>
          cartItemComponent(item.imgSrc, item.title, item.price, item.quantity)
        )
        .join("");

      updateCartTotal();

      // Configura los eventos para aumentar, disminuir cantidad y eliminar
      items.forEach((item, index) => {
        const increaseBtn = cartItemsContainer.querySelector(
          `[data-title="${item.title}"].increase-quantity`
        );
        const decreaseBtn = cartItemsContainer.querySelector(
          `[data-title="${item.title}"].decrease-quantity`
        );
        const deleteBtn = cartItemsContainer.querySelector(
          `[data-title="${item.title}"].remove-item`
        );

        if (increaseBtn) {
          increaseBtn.addEventListener("click", () => {
            item.quantity += 1;
            setData("cartItems", items);
            updateCartDisplay();
          });
        }

        if (decreaseBtn) {
          decreaseBtn.addEventListener("click", () => {
            if (item.quantity > 1) {
              item.quantity -= 1;
              setData("cartItems", items);
              updateCartDisplay();
            }
          });
        }

        if (deleteBtn) {
          deleteBtn.addEventListener("click", () => {
            // Elimina el producto del array 'items' usando el índice
            items.splice(index, 1);
            setData("cartItems", items); // Guarda el array actualizado en localStorage
            updateCartDisplay(); // Actualiza la visualización del carrito
          });
        }
      });
      // aplicar cupón si hay uno guardado
      const appliedCoupon = getData("appliedCoupon");
      if (appliedCoupon && typeof appliedCoupon === "object" && appliedCoupon.code) {
        let total = items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        let totalConDescuento = total;

        if (appliedCoupon.discount === "Envío Gratis" && total >= 40000) {
          // No se descuenta nada del total
        } else if (
          appliedCoupon.discount !== "Envío Gratis" &&
          total >= (appliedCoupon.minAmount || 0)
        ) {
          const discount = (total * appliedCoupon.discount) / 100;
          totalConDescuento = total - discount;
        }

        updateCouponMessage(appliedCoupon.code);
        updateCartTotal(totalConDescuento);
      } else {
        updateCartTotal(); // sin descuento
      }
    }
    function setupCheckoutEvent() {
      const checkoutButton = document.getElementById("checkoutButton");
      if (checkoutButton) {
        // Asegurate de evitar múltiples listeners duplicados
        checkoutButton.removeEventListener("click", handleCheckout);
        checkoutButton.addEventListener("click", handleCheckout);
      }
    }
    setupCheckoutEvent(); // 👈 Esto asegura que el botón tenga el listener después de renderizarse

    
    
    
}



// Inicializar el carrito al cargar la página
window.addEventListener("load", () => {
  updateCartDisplay(); // Este debe renderizar el checkoutButton

  // ⚠️ Esto debe ir después de renderizar el HTML del botón
  const checkoutButton = document.getElementById("checkoutButton");
  if (checkoutButton) {
    checkoutButton.addEventListener("click", handleCheckout);
  }
});

async function handleCheckout(e) {
  e.preventDefault();

  const cartItems = getData("cartItems") || [];
  const user = JSON.parse(sessionStorage.getItem("userData"));
  const coupon = getData("appliedCoupon");
  const hasValidCoupon = coupon && coupon.discount;

  if (!cartItems.length) {
    alert("Debes agregar al menos un producto para continuar.");
    return;
  }

  if (!user) {
    window.location.href =
      "http://localhost:5000/pages/auth/login.html?redirect=orden";
    return;
  }

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const discount = hasValidCoupon ? (total * coupon.discount) / 100 : 0;
  const finalTotal = total - discount;

  try {
    const bodyData = {
      user: {
        id: user.id,
        firstName: user.firstName,
        email: user.email,
      },
      cartItems: cartItems.map((item) => ({
        product: item._id || item.id,
        quantity: item.quantity,
      })),
      total: finalTotal,
    };

    if (hasValidCoupon) {
      bodyData.coupon = coupon._id || coupon.id;
    }

    const token = sessionStorage.getItem("token");

    const payload = JSON.parse(atob(token.split(".")[1]));
    const isExpired = payload.exp * 1000 < Date.now();
    if (isExpired) {
      alert("Tu sesión ha expirado, por favor iniciá sesión nuevamente.");
      sessionStorage.clear();
      window.location.href = "http://localhost:5000/pages/auth/login.htm";
      return;
    }

    const response = await fetch("/orders/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bodyData),
    });

    if (!response.ok) throw new Error("Error al generar la orden");

    const result = await response.json();

    localStorage.setItem("lastOrderId", result.order?._id || result.orderId);

    // Justo antes de limpiar y redirigir
    localStorage.setItem("lastOrderCart", JSON.stringify(cartItems));
    localStorage.setItem("lastOrderCoupon", JSON.stringify(coupon));

    // Limpiar carrito
    setData("cartItems", []);
    setData("appliedCoupon", null);

    window.location.href = "http://localhost:5000/pages/orden/orden.html";
  } catch (error) {
    alert("Ocurrió un error al generar la orden: " + error.message);
  }
}

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


