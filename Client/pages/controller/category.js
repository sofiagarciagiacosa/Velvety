import { navbarComponent } from "/components/navbar.js";
import { cardComponent } from "/components/card.js";
import { cartComponent } from "/components/cart.js";
import { addItemToCart, updateCartDisplay } from "../items/items.js";
import { loadCoupons } from "/components/coupon.js";
import { applyCouponAndCalculateTotal, updateCartTotal, loadCouponsForCart } from "../items/items.js";
import { initProductControls } from "../productos/productos.js";

let navContainer = document.querySelector('header');
let cardContainer = document.getElementById('cardContainer');
let cartContainer = document.getElementById('cartContainer');


window.addEventListener('load', () => {
    navContainer.innerHTML = navbarComponent;
    cartContainer.innerHTML = cartComponent;

    // Inicializa filtros y sort
    initProductControls(fetchProducts);
    // Carga los productos según la categoría obtenida
    fetchProducts();

    loadCouponsForCart();  // Espera a que los cupones se carguen
    
    loadCoupons();  // Ahora que los cupones están cargados, carga los cupones especiales

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
    
    

    const cartIcon = document.getElementById('cartIcon');
    const offcanvasCart = new bootstrap.Offcanvas(document.getElementById('offcanvasRight'));

    cartIcon.addEventListener('click', (event) => {
        event.preventDefault();
        offcanvasCart.show();
    });
    // Ahora agregamos el event listener para el botón de descuento
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
    
    
});

async function fetchProducts({ sort = null } = {}) {
    const category = document.body.getAttribute("data-category");
    try {
      const response = await fetch("/products");
      const data = await response.json();

      let allProducts = [];

      if (category === "All") {
        // Juntar todos los productos de todas las categorías
        data.forEach((cat) => {
          allProducts = allProducts.concat(cat.productos);
        });
      } else {
        const categoryData = data.find((cat) => cat.categoria === category);
        if (categoryData) {
          allProducts = categoryData.productos;
        }
      }
      // Aplicar ordenamiento si corresponde
      if (sort === "release") {
        // Ordenar por ID descendente (más nuevos primero)
        allProducts.sort((a, b) => b.id - a.id);
      } else if (sort === "bestseller") {
        // Ordenar por soldQuantity descendente (más vendidos primero)
        allProducts.sort((a, b) => b.soldQuantity - a.soldQuantity);
      }else if (sort === "asc") {
        // Ordenar por precio ascendente
        allProducts.sort((a, b) => a.price - b.price);
      } else if (sort === "desc") {
        // Ordenar por precio descendente
        allProducts.sort((a, b) => b.price - a.price);
      }
      

      let cardsHtml = `<div class="row row-cols-1 row-cols-md-3 g-4">`;
      cardsHtml += allProducts
        .map((product) => {
          return `
                <div class="col">
                    ${cardComponent(
                      product.imgSrc,
                      product.title,
                      product.text,
                      "Comprar",
                      product.price
                    )}
                </div>
            `;
        })
        .join("");
      cardsHtml += `</div>`;

      cardContainer.innerHTML = cardsHtml;

      const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
      const offcanvasCart = new bootstrap.Offcanvas(
        document.getElementById("offcanvasRight")
      );

      addToCartButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
          event.preventDefault();

          const product = {
            imgSrc: button.getAttribute("data-imgsrc"),
            title: button.getAttribute("data-title"),
            price: parseFloat(button.getAttribute("data-price")),
          };

          addItemToCart(product);
          offcanvasCart.show();
        });
      });

      updateCartDisplay();
    } catch (error) {
        console.error("Error al cargar los productos:", error);
    }
}
