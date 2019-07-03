class UI {

    // display categories
    displayCategories() {
        const categoriesList = cocktailAPI.getCategories()
            .then(categories => {
                const catlist = categories.categories.drinks;

                // append a first option to the select without value
                const firstOption = document.createElement('option');
                firstOption.textContent = '- Select -';
                firstOption.value = '';
                document.querySelector('#search').appendChild(firstOption);

                // append categories to the select 
                catlist.forEach(category => {
                    const option = document.createElement('option');
                    option.textContent = category.strCategory;
                    option.value = category.strCategory.split(' ').join('_');
                    document.querySelector('#search').appendChild(option);

                })
            })
    }
    

    // display drinks by ingredients, category, alcoholic or non-alcoholic
    displayDrinks(drinks) {
        
        const resultWrapper = document.querySelector('.results-wrapper');
        resultWrapper.style.display = 'block';

        // insert the results
        const resultsDiv = document.querySelector('#results');

        drinks.forEach(drink => {
            resultsDiv.innerHTML += `
                <div class="col-md-4">
                    <div class="card my-3">
                        <button type="button" data-id="${drink.idDrink}" class="favorite-btn btn btn-outline-info">
                            +
                        </button>
                        <img class="card-img-top" src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
                        <div class="card-body">
                            <h2 class="card-title text-center">${drink.strDrink}</h2>
                            <a data-target="#recipe" href="#" data-toggle="modal" class="btn btn-success get-recipe" data-id="${drink.idDrink}">Get Recipe</a>
                        </div>
                    </div>
                </div>
            `;
        });
        
    }

     // displays drinks with respective ingredients
     displayDrinksWithIngredients(drinks) {
        // show results
        const resultWrapper = document.querySelector('.results-wrapper');
        resultWrapper.style.display = 'block';

        // insert the results
        const resultsDiv = document.querySelector('#results');

        drinks.forEach(drink => {
            resultsDiv.innerHTML += `
                <div class="col-md-6">
                    <div class="card my-3">
                        <button type="button" data-id="${drink.idDrink}" class="favorite-btn btn btn-outline-info">
                            +
                        </button>
                        <img class="card-img-top" src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
                        <div class="card-body">
                            <h2 class="card-title text-center">${drink.strDrink}</h2>
                            <p class="card-text font-weight-bold">Instructions: </p>
                            <p class="card-text">
                                ${drink.strInstructions}
                            </p>
                            <p class="card-text">
                                <ul class="list-group">
                                    <li class="list-group-item alert alert-danger">Ingredients</li>
                                    ${this.displayIngredients(drink)}
                                </ul>
                            </p>
                            <p class="card-text font-weight-bold">Extra Information:</p>
                            <p class="card-text">
                                <span class="badge badge-pill badge-success">
                                    ${drink.strAlcoholic}
                                </span>
                                <span class="badge badge-pill badge-warning">
                                    Category: ${drink.strCategory}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            `; 
        });
        
    }

    // prints the ingredients
    displayIngredients(drink) {
        let ingredients = [];
        for(let i = 1; i < 16; i++) {
            const ingredientMeasure = {};
            if( drink[`strIngredient${i}`] !== '' ) {
                ingredientMeasure.ingredient = drink[`strIngredient${i}`];
                ingredientMeasure.measure = drink[`strMeasure${i}`];
                ingredients.push(ingredientMeasure);
            }

            console.log(ingredients);

            // build html template
            let ingredientsTemplate = '';
            ingredients.forEach(ingredient => {
                ingredientsTemplate += `
                    <li class="list-group-item">${ingredient.ingredient} - ${ingredient.measure}</li>
                `;
            });
            return ingredientsTemplate;
        }
    }

    // displays single recipe in modal
    displaySingleRecipe(recipe) {
        const modalTitle = document.querySelector('.modal-title'),
                modalDescription = document.querySelector('.modal-body .description-text'),
                modalIngredients = document.querySelector('.modal-body .ingredient-list .list-group');

        modalTitle.innerHTML = recipe.strDrink;
        modalDescription.innerHTML = recipe.strInstructions

        modalIngredients.innerHTML = this.displayIngredients(recipe);

    }

    // print custom message
    printMessage(message, className) {
        const div = document.createElement('div');
        
        // add the html
        div.innerHTML = `
            <div class="alert alert-dismissible alert-${className}">
                <button type="button" class="close" data-dismiss="alert">x</button>
                ${message}
            </div>
        `;

        // use insert before
        const reference = document.querySelector('.jumbotron h1');
        const parentNode = reference.parentElement;
        parentNode.insertBefore(div, reference);

        setTimeout(function(){
            document.querySelector('.alert-danger').remove();
        }, 3000);

        
    }

    // clear previous results
    clearResults() {
        const resultsDiv = document.querySelector('#results');
        resultsDiv.innerHTML = '';
    }

    // displays favorites from storage
    displayFavorites(favorites) {
        const favoritesTable = document.querySelector('#favorites tbody');
        favorites.forEach(drink => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <img src="${drink.image}" alt="${drink.name}" width=100>
                </td>
                <td>${drink.name}</td>
                <td>
                    <a href="#" data-toggle="modal" data-target="#recipe" data-id="${drink.id}" 
                    class="btn btn-success get-recipe">
                        View
                    </a>
                </td>
                <td>
                    <a href="#" data-id="${drink.id}" class="btn btn-danger remove-recipe">
                        Remove
                    </a>
                </td>
            `;
            favoritesTable.appendChild(tr);
        });
    }

    // remove single element from dom
    removeFavorite(element) {
        element.remove();
    }

   
}

