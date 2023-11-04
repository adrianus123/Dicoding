import DataSource from "../data/data-source";
import "../components/card-list.js";
import "../components/search-bar.js";

const main = () => {
  const search = document.querySelector("search-bar");
  const cardList = document.querySelector("card-list");
  const title = document.getElementById("result_title");

  const onSearchButtonClicked = async () => {
    try {
      const result = await DataSource.searchCocktail(search.value);
      renderResult(result.drinks);
    } catch (error) {
      fallbackResult();
    }
  };

  const renderResult = (result) => {
    if (search.value) {
      title.innerText = `Search result for "${search.value}"`;
    } else {
      title.innerText = `Search result for All`;
    }

    cardList.setCocktails = result;
  };

  const fallbackResult = () => {
    title.innerText = `No results for "${search.value}"`;
  };

  search.clickEvent = onSearchButtonClicked;
};

export default main;
