class AppBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="logo">
          <img src="/assets/icons/cocktail-glass.svg" alt="cocktail" />
          <h1>CocktailPedia</h1>
      </div>
    `;
  }
}

customElements.define("app-bar", AppBar);
