export const userCard = (arr) => {
    return `
    <div id="userContainer">
        <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-person"></i>
            </button>
            <ul class="dropdown-menu">
                <li><span class="dropdown-item-text">Hola, ${ arr.firstName}!</span></li>
                <li><button class="dropdown-item" id="btnLogOut" type="button">Cerrar sesión</button></li>
            </ul>
        </div>
    </div>
    
    
    `
}