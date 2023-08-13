class NavBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <nav>
            <ul>
                <li>
                    <a href="#">Categories</a>
                    <ul class="dropdown">
                        <li>
                        <a href="">Link</a>
                        </li>
                        <li>
                        <a href="">Link</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="#">Ingredients</a>
                    <ul class="dropdown">
                    <li>
                        <a href="">Link</a>
                    </li>
                    <li>
                        <a href="">Link</a>
                    </li>
                    <li>
                        <a href="">Link</a>
                    </li>
                    </ul></li>
                <li><a href="#">Glasses</a></li>
                <li><a href="#">Alcoholic</a></li>
            </ul>
        </nav>
    `;
  }
}

customElements.define("nav-bar", NavBar);
