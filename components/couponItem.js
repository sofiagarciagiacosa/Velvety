export function createCouponComponent(coupon) {
    return `
        <div class="coupon-banner mb-1 p-2 rounded shadow text-muted"
             style="cursor: pointer; background-color: #FAF9F6; font-size: 11px;">
            OBTÉN ${coupon.discount} OFF
            <span class="closeBanner" style="cursor: pointer; margin-left: 4px;">✖</span>
        </div>

        <div class="modal fade" id="modal-${coupon.code}" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content modal-background">
                    <div class="modal-header">
                        
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body text-center text-muted p-3 m-3">
                        <h1 class="modal-title fs-5 text-muted text-center w-100 p-2 m-2">PORQUE LO MERECÉS</h1>
                        <p class= "modal-text p-2 m-2">  Tenemos una oferta especial para vos. </p>
                        <p class= "modal-text p-2 m-2">  Usa el código <strong>${coupon.code}</strong> ${coupon.condition} para un 
                        <strong>${coupon.discount} de descuento</strong>. </p>
                        <p class= "modal-text mt-3 mb-1 p-3">  *Los cupones no son acumulables* </p>
                       
                        
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary btn-product" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}
