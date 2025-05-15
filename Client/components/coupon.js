import { createCouponComponent } from "./couponItem.js";  

export async function loadCoupons() {
    try {
        let specialContainer = document.getElementById("specialCouponsContainer");

        if (!specialContainer) {
            console.error("ERROR: No se encontró el contenedor de cupones especiales.");
            return;
        }

        // Filtramos solo los cupones especiales (con "special: true")
        const couponResponse = await fetch("/coupon/special");
        const specialCoupons = await couponResponse.json();

        // Si no hay cupones especiales, no hacemos nada
        if (specialCoupons.length === 0) {
            console.log("No hay cupones especiales.");
            return;
        }

        // Generamos los dos carteles
        specialCoupons.forEach(coupon => {
            let couponHTML = createCouponComponent(coupon);
            let div = document.createElement("div");
            div.innerHTML = couponHTML;

            let banner = div.querySelector(".coupon-banner");
            let closeBtn = div.querySelector(".closeBanner");
            let modal = div.querySelector(".modal");

            banner.addEventListener("click", () => {
                let couponModal = new bootstrap.Modal(modal);
                couponModal.show();
            });

            closeBtn.addEventListener("click", (event) => {
                event.stopPropagation();
                banner.style.display = "none";
            });

            // Agregamos el banner al contenedor de cupones especiales
            specialContainer.appendChild(banner);
            // Guardamos el modal en el body
            document.body.appendChild(modal);
        });

    } catch (error) {
        console.error("Error al cargar los cupones:", error);
    }
}
