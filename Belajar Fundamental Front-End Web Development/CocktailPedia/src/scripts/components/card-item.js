import "../components/modal.js";
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
        <div class="card">
            <img src="${this.data.strDrinkThumb}" alt="${this.data.strDrink}" />
            <div class="card_info">
            <h3>${this.data.strDrink}</h3>
            <div class="detail_info">
                <table class="table" aria-describedby="information of item">
                <tr>
                    <th>Category</th>
                    <td>:</td>
                    <td>${this.data.strCategory}</td>
                </tr>
                <tr>
                    <th>Glasses</tg>
                    <td>:</td>
                    <td>${this.data.strGlass}</td>
                </tr>
                <tr>
                    <th>Alcoholic</th>
                    <td>:</td>
                    <td>${this.data.strAlcoholic}</td>
                </tr>
                </table>
            </div>
            <button class="open_modal" data-open="modal">Open Detail</button>
            </div>
        </div>
    `;

    this.querySelector("[data-open]").addEventListener("click", () => {
      this.displayData(this.data.idDrink);
    });
  }
}

customElements.define("card-item", CardItem);
