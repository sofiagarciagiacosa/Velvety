
export const cartComponent= `
        
        <div class="offcanvas offcanvas-end offcanvas-wide p-3" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel" style="width: 450px">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title mt-3" id="offcanvasRightLabel">CARRITO</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="divider"></div> 
            <div class="offcanvas-body" id="cartItemsContainer">
                <!-- Aquí se agregarán los productos del carrito -->
            </div>
            <div class="divider"></div>
            <div class="offcanvas-footer mt-3">
                <h5>Total: $<span id="cartTotal">0.00</span></h5>
                <button type="button" class="btn btn-cart" id="checkoutButton">iniciar compra</button>
            </div>
        </div>    
`