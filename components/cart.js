
export const cartComponent= `
        
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasRightLabel">CARRITO</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body" id="cartItemsContainer">
                <!-- Aquí se agregarán los productos del carrito -->
            </div>
            <div class="offcanvas-footer">
                <h5>Total: $<span id="cartTotal">0.00</span></h5>
                <button type="button" class="btn btn-primary" id="checkoutButton">Checkout</button>
            </div>
        </div>    
`