class SearchBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  set clickEvent(event) {
    this._clickEvent = event;
    this.render();
  }

  get value() {
    return this.querySelector("#search_input").value;
  }

  render() {
    this.innerHTML = `
        <section class="search-bar">
            <input type="search" id="search_input" placeholder="Search..." />
            <button id="search_button" type>
                <img src="/assets/icons/search.svg" alt="search icon" />
            </button>
        </section>
    `;

    this.querySelector("#search_button").addEventListener(
      "click",
      this._clickEvent
    );
  }
}

customElements.define("search-bar", SearchBar);
