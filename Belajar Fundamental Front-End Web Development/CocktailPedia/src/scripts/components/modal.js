class Modal extends HTMLElement {
  connectedCallback() {
    if (this.data) {
      let count = 1;
      let ingredients = [];
      for (const i in this.data) {
        let ingredient = "";
        let measure = "";
        if (i.startsWith("strIngredient") && this.data[i]) {
          ingredient = this.data[i];
          if (this.data[`strMeasure` + count]) {
            measure = this.data[`strMeasure` + count];
          }
          count++;
          ingredients.push(`${measure} ${ingredient}`);
        }
      }
      this.ingredients = ingredients;
    }

    this.render();
  }

  setIngredients(ingredients) {
    this.ingredients = ingredients;
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
          <div class="modal_description">
            <div>
              <h4>Ingredients</h4>
              <ul class="ingredients"></ul>
            </div>
            <div>
              <h4>Instructions</h4>
              <p>${this.data.strInstructions}</p>
            </div>
          </div>
        </div>
      </div>
    `;

    let ingredientsCon = this.querySelector(".ingredients");
    this.ingredients?.forEach((item) => {
      let listItem = document.createElement("li");
      listItem.classList.add("ingredient-list");
      listItem.innerText = item;
      ingredientsCon.appendChild(listItem);
    });

    this.querySelector("[data-close]").addEventListener("click", () => {
      const modalElement = document.getElementById("modal");
      modalElement.classList.remove("is-visible");
      this.innerHTML = "";
    });
  }
}

customElements.define("modal-element", Modal);
