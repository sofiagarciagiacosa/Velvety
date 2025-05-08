import { navbarComponent } from "/components/navbar.js"

let  navContainer = document.querySelector('header')

window.addEventListener('load', () => {
    navContainer.innerHTML=navbarComponent
})

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const firstName = document.getElementById("txtnombre").value;
  const lastName = document.getElementById("txtapellido").value;
  const email = document.getElementById("txtemail").value;
  const password = document.getElementById("txtpassword").value;
  const birthDate = document.getElementById("date").value;

  const newUser = { firstName, lastName, email, password, birthDate };

  try {
    const response = await fetch("http://localhost:5000/registro", { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Usuario creado exitosamente");

      // Guardamos los datos esenciales en sessionStorage
      sessionStorage.setItem(
        "userData",
        JSON.stringify({
          id: data.id,
          firstName: data.firstName,
          email: data.email,
        })
      );

      window.location.href = "http://localhost:5000/";
    } else {
      alert(`Error: ${data.message}`);
    }
  } catch (error) {
    console.error("Error al crear usuario:", error);
    alert("Error en el servidor");
  }
});


