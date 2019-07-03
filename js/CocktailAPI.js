class CocktailAPI {

    // query api to get drinks by alcohol
    async getDrinksByAlcohol(term) {
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${term}`);
        const cocktails = await apiResponse.json();
        return {
            cocktails
        }
    }

    // query api to get drinks by category
    async getDrinksByCategories(category) {
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
        const cocktails = await apiResponse.json();
        return {
            cocktails
        }
    }

    // query api to get categories
    async getCategories() {
        const apiResponse = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        const categories = await apiResponse.json();
        return {
            categories
        } 
    }

    // query api to get recipe
    async getSingleRecipe(id) {
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const recipe = await apiResponse.json();
        return {
            recipe
        }
    }

    // query api to get drinks by ingredient
    async getDrinksByIngredient(name) {
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}`);

        const cocktails = await apiResponse.json();

        return {
            cocktails
        }
    }

    // query API to get drinks by name
    async getDrinksByName(name) {
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);

        const cocktails = await apiResponse.json();

        return {
            cocktails
        }
    }
}