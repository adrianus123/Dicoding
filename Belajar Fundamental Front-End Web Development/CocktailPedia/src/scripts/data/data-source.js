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

  static async getCocktailByCategory(category) {
    try {
      const response = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  static async getCocktailByIngredients(ingredients) {
    try {
      const response = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredients}`
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  static async getCocktailByAlcoholic(alcoholic) {
    try {
      const response = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${alcoholic}`
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  static async getCocktailByGlasses(glasses) {
    try {
      const response = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${glasses}`
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  static async getCategories() {
    try {
      const response = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  static async getGlasses() {
    try {
      const response = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list`
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  static async getIngredients() {
    try {
      const response = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list`
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  static async getAlcoholic() {
    try {
      const response = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list`
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
}

export default DataSource;
