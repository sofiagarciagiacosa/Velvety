// components/card.js
export const cardComponent = (imgSrc, title, text, buttonLabel) => {
    return `
        <div class="col">
        <div class="card h-100">
            <img src="${imgSrc}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${text}</p>
            </div>
            <div class="card-footer">
            <a href="#" class="btn btn-primary">${buttonLabel}</a>
            </div>
        </div>
        </div>
    `;
}
