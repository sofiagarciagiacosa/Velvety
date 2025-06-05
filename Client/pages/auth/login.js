import { navbarComponent } from "/components/navbar.js"

let  navContainer = document.querySelector('header')
const form= document.getElementById('login')

window.addEventListener('load', () => {
    navContainer.innerHTML=navbarComponent

})

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let userEmail = document.getElementById("floatingInput").value;
  let userPassword = document.getElementById("floatingPassword").value;

  try {
    const response = await fetch("/account/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: userEmail, password: userPassword }),
    });

    const result = await response.json();

    if (response.ok) {
      sessionStorage.setItem("userData", JSON.stringify(result.user));
      sessionStorage.setItem("token", result.token); // Guardás el token
      window.location.href = "http://localhost:5000/index.html";
    } else {
      alert(result.message || "Error al iniciar sesión");
    }
  } catch (error) {
    console.error("Error en login:", error);
    alert("Ocurrió un error al intentar iniciar sesión.");
  }
});
  

