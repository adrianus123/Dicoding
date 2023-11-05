import cocktailLogo from "../../../public/assets/icons/cocktail-glass.svg";

class AppBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="logo">
          <div class="image"></div>
          <h1>CocktailPedia</h1>
      </div>
    `;

    const logo = this.querySelector(".image");
    const image = document.createElement("img");
    image.src = cocktailLogo;
    image.alt = "cocktail";
    logo.appendChild(image);
  }
}

customElements.define("app-bar", AppBar);
