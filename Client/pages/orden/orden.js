import { navbarComponent } from "/components/navbar.js";
import { cartComponent } from "/components/cart.js";
import { addItemToCart, updateCartDisplay } from "/pages/items/items.js";
import { loadCoupons } from "/components/coupon.js";
import {
  applyCouponAndCalculateTotal,
  updateCartTotal,
  loadCouponsForCart,
} from "/pages/items/items.js";
import { getData } from "../../utils/localStorage.js";

let navContainer = document.querySelector("header");
let cartContainer = document.getElementById("cartContainer");


const renderOrderDetails = () => {
  const orderContainer = document.querySelector(".card-orden .row"); 
  const cartItems = getData("cartItems"); 
  const coupon = getData("appliedCoupon"); 

  let total = 0;

  const pedidoCol = orderContainer.querySelector(".col-md-6:last-child");
  pedidoCol.innerHTML = `<h6 class="fw-bold text-uppercase text-orden mb-3">Mi Pedido</h6>`;

  cartItems.forEach((item) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    pedidoCol.innerHTML += `
            <div class="d-flex mb-3 align-items-center">
                <img src="${item.imgSrc}" class="cart-item-img" style="width: 50px; height: 50px; margin-right: 10px;" alt="${item.title}">
                <div>
                    <p class="mb-0"><strong>${item.title}</strong></p>
                    <p class="mb-0">$${item.price}</p>
                    <p class="mb-0">x${item.quantity}</p>
                </div>
            </div>
        `;
  });

  if (coupon?.code) {
    const descuentoAplicado = total * (coupon.discount / 100);
    total -= descuentoAplicado;

    pedidoCol.innerHTML += `
            <p class="mt-3"><strong>Cupón en uso:</strong> ${coupon.code}</p>
            <p><strong>Total con descuento:</strong> $${total.toFixed(2)}</p>
        `;
  } else {
    pedidoCol.innerHTML += `<p class="mt-3"><strong>Total:</strong> $${total.toFixed(
      2
    )}</p>`;
  }
};

const renderUserData = () => {
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  if (!userData) return;

  const profileCol = document.querySelector(".card-orden .col-md-6");

  profileCol.innerHTML = `
      <h6 class="fw-bold text-uppercase text-orden mb-3">Mi Perfil</h6>
      <p class="mb-1"><strong>Nombre</strong></p>
      <p>${userData.firstName}</p>
      
      <p class="mb-1"><strong>Apellido</strong></p>
      <p>${userData.lastName}</p>
      
      <p class="mb-1"><strong>Email</strong></p>
      <p>${userData.email}</p>
      
      <p class="mb-1"><strong>Fecha de Nacimiento</strong></p>
      <p>${userData.birthDate}</p>
    `;
};
  



window.addEventListener('load', async () => {
    try {
        // Cargar el componente de la barra de navegación
        navContainer.innerHTML = navbarComponent;

        // Cargar el offcanvas del carrito
        cartContainer.innerHTML = cartComponent;

        // Asegurarse de que los cupones se carguen antes de continuar
        await loadCouponsForCart();  // Espera a que los cupones se carguen

        loadCoupons();  // Ahora que los cupones están cargados, carga los cupones especiales

        // Actualizar la visualización del carrito al cargar la página
        updateCartDisplay();

        // Configurar eventos una vez que el cupón está en el DOM
        const discountBanner = document.getElementById("discountBanner");
        const closeBanner = document.getElementById("closeBanner");
        if (discountBanner) {
            discountBanner.addEventListener("click", () => {
                const discountModal = new bootstrap.Modal(document.getElementById("discountModal"));
                discountModal.show();
            });

            closeBanner.addEventListener("click", (event) => {
                event.stopPropagation();
                discountBanner.style.display = "none";
            });
        }

        // Selecciona el ícono del carrito en el navbar y configura el listener
        const cartIcon = document.getElementById('cartIcon');
        const offcanvasCart = new bootstrap.Offcanvas(document.getElementById('offcanvasRight'));

        cartIcon.addEventListener('click', (event) => {
            event.preventDefault();
            offcanvasCart.show();
        });

        // Agregamos el event listener para el botón de descuento
        const applyDiscountButton = document.getElementById('applyDiscount');
        if (applyDiscountButton) {
            applyDiscountButton.addEventListener('click', async () => {
                const couponCode = document.getElementById('discountCode').value.trim();
                const totalConDescuento = await applyCouponAndCalculateTotal(couponCode);
                updateCartTotal(totalConDescuento);
            });
        }
        // Asegurar que el evento de eliminar cupón esté activo
        const removeCouponBtn = document.getElementById("removeCoupon");
        if (removeCouponBtn) {
            removeCouponBtn.addEventListener("click", removeCoupon);
        }

        renderOrderDetails();
        renderUserData();

    } catch (error) {
        console.error("Error al cargar los cupones o el contenido de la página:", error);
    }
});
