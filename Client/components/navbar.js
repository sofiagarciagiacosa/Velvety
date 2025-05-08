import { userCard } from "./userCard.js";
import { getUserData } from "../pages/auth/account.js";
import { renderUserCard } from "../pages/auth/account.js";
import { logOut } from "../pages/auth/account.js";

const url = "http://localhost:5000/";
const userInfo = getUserData('userData');


const elements= [
    {title: 'Hidratación', link:`${url}pages/hidratacion/hidratacion.html`},
    {title: 'Limpieza', link:`${url}pages/limpieza/limpieza.html`},
    {title: 'Tratamientos', link:`${url}pages/tratamientos/tratamientos.html`},
    userInfo 
        ? { customElement: userCard(userInfo) }  // Renderiza userCard si el usuario está logueado
        : { title: 'Login', link: `${url}pages/auth/login.html`, icon: 'bi bi-person' },
    {title: 'Carrito', link:`${url}#`, icon: 'bi bi-cart3'}
]


export const navbarComponent= `
    
        <nav class="navbar fixed-top navbar-expand-lg " >
            <div class="container-fluid">
                <a class="navbar-brand" href="/index.html">Velvety</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse " id="navbarSupportedContent" >
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        ${
                            elements.map(e => {
                                if (e.customElement) {
                                    return `<li class="nav-item">${e.customElement}</li>`;
                                }
                                return `<li class="nav-item">
                                            <a class="nav-link" href="${e.link}" ${e.icon === 'bi bi-cart3' ? 'id="cartIcon"' : ''}>
                                                ${e.icon ? `<i class="${e.icon}"></i>` : e.title}
                                            </a>
                                        </li>`;
                            }).join('')
                        }
                        
                        
                    </ul>
                </div>    
            </div>
        </nav>

`
window.addEventListener('load', () => {
    renderUserCard();
});

// Delegación de evento en document para el botón de cerrar sesión
document.addEventListener('click', (event) => {
    if (event.target.id === 'btnLogOut') {
        logOut('userData');
        console.log("Sesión cerrada");
        window.location.href = "http://localhost:5000/pages/auth/login.html";
    }
});
