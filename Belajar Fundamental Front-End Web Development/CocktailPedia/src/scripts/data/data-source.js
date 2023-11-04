import axios from "axios";

class DataSource {
  static async searchCocktail(keyword) {
    try {
      const response = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${keyword}`
      );

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  static async getCocktailById(id) {
    try {
      const response = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
      );

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}

export default DataSource;
