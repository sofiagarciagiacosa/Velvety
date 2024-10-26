const url= 'http://127.0.0.1:5500/'

const elements= [
    {title: 'Hidratación', link:`${url}pages/hidratacion/hidratacion.html`},
    {title: 'Limpieza', link:`${url}pages/limpieza/limpieza.html`},
    {title: 'Tratamientos', link:`${url}pages/tratamientos/tratamientos.html`},
    {title: 'Login', link:`${url}pages/auth/login.html`, icon: 'bi bi-person'},
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
                            elements.map(e=>{
                                return `<li class="nav-item">
                                            <a class="nav-link" href="${e.link}">
                                                ${e.icon ? `<i class="${e.icon}"></i>` : e.title}
                                            </a>
                                        </li>
                                `;
                            }).join('')
                        }
                        
                    </ul>
                </div>    
            </div>
        </nav>

`
