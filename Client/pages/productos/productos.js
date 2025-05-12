
export function initProductControls(fetchFunction) {
  const filterButtons = document.querySelectorAll(".filter-btn");
  // Ejecuta fetch por primera vez con la categoría actual
  fetchFunction();
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active-filter"));
      button.classList.add("active-filter");

      // Cambiar atributo en el body
      const selectedCategory = button.getAttribute("data-category");
      document.body.setAttribute("data-category", selectedCategory);

      fetchFunction(); // Vuelve a cargar los productos con la nueva categoría
    });
  });

  const sortButtons = document.querySelectorAll(".sort-btn");
  sortButtons.forEach((button) => {
    button.addEventListener("click", () => {
      sortButtons.forEach((btn) => btn.classList.remove("active-sort"));
      button.classList.add("active-sort");

      // Acá podrías agregar lógica de ordenamiento si querés
    });
  });
}
