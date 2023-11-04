import "./modal.js";
import DataSource from "../data/data-source.js";

class CardItem extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  set setData(data) {
    this.data = data;
    this.render();
  }

  displayData = async (id) => {
    try {
      const response = await DataSource.getCocktailById(id);
      const modalElement = document.createElement("modal-element");
      modalElement.setData = response.drinks[0];

      const modalContainer = document.getElementById("modal");
      modalContainer.appendChild(modalElement);
      modalContainer.classList.add("is-visible");
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    this.innerHTML = `
        <div class="card_2">
            <img src="${this.data.strDrinkThumb}" alt="${this.data.strDrink}" />
            <div class="card_2_info">
                <h3>${this.data.strDrink}</h3>
                <div class="card_detail">
                    <div class="card_detail_item">
                        <p>Category</p>
                        <p>:</p>
                        <p>${this.data.strCategory}</p>
                    </div>
                    <div class="card_detail_item">
                        <p>Glasses</p>
                        <p>:</p>
                        <p>${this.data.strGlass}</p>
                    </div>
                    <div class="card_detail_item">
                        <p>Alcoholic</p>
                        <p>:</p>
                        <p>${this.data.strAlcoholic}</p>
                    </div>
                </div>
                <button class="open_modal" data-open="modal">How To Make</button>
            </div>
        </div>
    `;

    this.querySelector("[data-open]").addEventListener("click", () => {
      this.displayData(this.data.idDrink);
    });
  }
}

customElements.define("card-item", CardItem);
