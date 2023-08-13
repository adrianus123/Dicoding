class Modal extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  set setData(data) {
    this.data = data;
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="modal_dialog">
        <div class="modal_header">
          <h2>${this.data.strDrink}</h2>
          <button class="close_modal" aria-label="close modal" data-close>
            ×
          </button>
        </div>
        <div class="modal_content">
          <img src="${this.data.strDrinkThumb}" alt="cocktail image" />
          <div>
            <div>
              <h4>Ingredients</h4>
            </div>
            <div>
              <h4>Instructions</h4>
              <p>${this.data.strInstructions}</p>
            </div>
          </div>
        </div>
      </div>
    `;

    this.querySelector("[data-close]").addEventListener("click", () => {
      const modalElement = document.getElementById("modal");
      modalElement.classList.remove("is-visible");
      this.innerHTML = "";
    });
  }
}

customElements.define("modal-element", Modal);
