import { navbarComponent } from "/components/navbar.js"

let  navContainer = document.querySelector('header')
const form= document.getElementById('login')

window.addEventListener('load', () => {
    navContainer.innerHTML=navbarComponent

})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    let userEmail= document.getElementById('floatingInput').value
    let userPassword= document.getElementById('floatingPassword').value

    fetch('/data/users.json').then(res => res.json()).then(users =>{
        const user = users.find(e => e.email === userEmail && e.password === userPassword)

        if(user){
            //session storage
            sessionStorage.setItem('userData', JSON.stringify(user))
            console.log('user');
            window.location.href = "http://localhost:5000/index.html";

        } else {
            console.log('Usuario no encontrado o credenciales incorrectas');
        }

    }) 

});

