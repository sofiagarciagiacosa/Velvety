
export function initProductControls(fetchFunction) {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const sortButtons = document.querySelectorAll(".sort-btn");
  let currentSort = null;
  // Ejecuta fetch por primera vez con la categoría actual
  fetchFunction();
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active-filter"));
      button.classList.add("active-filter");

      // Cambiar atributo en el body
      const selectedCategory = button.getAttribute("data-category");
      document.body.setAttribute("data-category", selectedCategory);

      fetchFunction({ sort: currentSort }); // Pasa el orden actual
    });
  });

  
  sortButtons.forEach((button) => {
    button.addEventListener("click", () => {
      sortButtons.forEach((btn) => btn.classList.remove("active-sort"));
      button.classList.add("active-sort");

      currentSort = button.getAttribute("data-sort");

      fetchFunction({ sort: currentSort }); // Aplica el nuevo orden
    });
  });
}
