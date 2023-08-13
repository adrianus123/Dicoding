import "./card-item.js";

class CardList extends HTMLElement {
  set setCocktails(cocktails) {
    this.cocktails = cocktails;
    this.render();
  }

  render() {
    this.innerHTML = ``;
    this.setAttribute("class", "card_list");
    this.cocktails.forEach((cocktail) => {
      const cardElement = document.createElement("card-item");
      cardElement.setData = cocktail;
      this.appendChild(cardElement);
    });
  }
}

customElements.define("card-list", CardList);
