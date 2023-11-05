import search from "../../../public/assets/icons/search.svg";

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
            <button id="search_button"></button>
        </section>
    `;

    this.querySelector("#search_button").addEventListener(
      "click",
      this._clickEvent
    );

    const searchButton = this.querySelector("#search_button");
    const searchIcon = document.createElement("img");
    searchIcon.src = search;
    searchIcon.alt = "search icon";
    searchButton.appendChild(searchIcon);
  }
}

customElements.define("search-bar", SearchBar);
