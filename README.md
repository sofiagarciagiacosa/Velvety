FIGMA 
https://www.figma.com/design/UZyBdOmtOjqEWCI97eIkbZ/Velvety--Figma-Sofia?node-id=0-1&node-type=canvas&t=GCL3OBAs6rCVcI92-0

Stack utilizado
Frontend:
HTML
CSS
JavaScript (vanilla)
Bootstrap

Backend:
Node.js
Express.js
MongoDB (con MongoDB Compass)
Mongoose (ODM)

Autenticación:
bcrypt (encriptación de contraseñas)
jsonwebtoken (generación y validación de tokens JWT)

Otras herramientas utilizadas:
LocalStorage y SessionStorage para manejo de datos en el frontend
Bootstrap Modal & Offcanvas para UI interactiva
MongoDB Compass para administración de la base de datos local


Roadmap del desarrollo
1. Planificación y diseño
Definición del concepto: e-commerce de productos de skincare.
Boceto inicial de las secciones.
Estructura de carpetas.

2. Frontend
Maquetación de las vistas con HTML y Bootstrap.
Creación de componentes reutilizables como Navbar, Cards de productos y Carrito.
Interacción dinámica con JavaScript.

3. Autenticación
Registro y login de usuarios con bcrypt y JWT.
Almacenamiento del token en sessionStorage y validación para permitir la compra solo con sesión activa.

4. Backend
Configuración del servidor con Express.js.
Conexión con MongoDB y creación de modelos (productos, usuarios, cupones, órdenes, categorías).
Implementación de rutas protegidas, validaciones y lógica de negocio.
Middleware para verificar tokens JWT.
