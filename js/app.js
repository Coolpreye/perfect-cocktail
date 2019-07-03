// instantiate the classes
const ui = new UI(),
        cocktailAPI = new CocktailAPI(),
        cocktailDB = new CocktailDB();




// create the event listeners
function eventListeners() {
    // document ready
    document.addEventListener('DOMContentLoaded', documentReady);

     // add event listener when form is submitted
     const searchForm = document.querySelector('#search-form');
     if(searchForm) {
         searchForm.addEventListener('submit', getCocktails);
     }

     // The results div listeners
     const resultsDiv = document.querySelector('#results');
     if(resultsDiv) {
         resultsDiv.addEventListener('click', resultsDelegation);
     }
}
eventListeners();

// get cocktails function
function getCocktails(e) {
    e.preventDefault();
    // read values from the form
    const searchValue = document.querySelector('#search').value;

    if(searchValue === '') {
        // call ui printMessage method
        ui.printMessage('Please enter a name', 'danger');
    } else {
        // server response from promise
        let serverResponse;
        // type of search, ingredients, cocktail or name
        const type = document.querySelector('#type').value;
        // evaluate the type of method and then execute the query
        switch(type) {
            case 'name':
                serverResponse =  cocktailAPI.getDrinksByName(searchValue);
                break;
            case 'ingredient':
                serverResponse = cocktailAPI.getDrinksByIngredient(searchValue);
                break;
            case 'category':
                serverResponse = cocktailAPI.getDrinksByCategories(searchValue);
                break;
            case 'alcohol':
                serverResponse = cocktailAPI.getDrinksByAlcohol(searchValue);
                break;
        }

        ui.clearResults();

        // query the rest API
            serverResponse
            .then(cocktails => {
                if(cocktails.cocktails.drinks === null) {
                    // nothing exists
                    ui.printMessage(`There are no cocktails for your seach, try again`, 'danger');
                } else {
                    if(type === 'name') {
                        ui.displayDrinksWithIngredients(cocktails.cocktails.drinks);
                    } else {
                        ui.displayDrinks(cocktails.cocktails.drinks);
                    }
                }
            })
    }
}

// delegation for the results area
function resultsDelegation(e) {
    e.preventDefault();

    if(e.target.classList.contains('get-recipe')) {
        cocktailAPI.getSingleRecipe(e.target.dataset.id)
        .then(recipe => {
            // display single recipe into a modal
            ui.displaySingleRecipe(recipe.recipe.drinks[0]);
        })
    }

    // when favorite btn is clicked
    if(e.target.classList.contains('favorite-btn')) {
        if(e.target.classList.contains('is-favorite')) {
            e.target.classList.remove('is-favorite');
            e.target.textContent = '+';

            // remove from storage
            cocktailDB.removeFromDB(e.target.dataset.id);
        } else {
            e.target.classList.add('is-favorite');
            e.target.textContent = '-';

            // get info
            const cardBody = e.target.parentElement;
            const drinkInfo = {
                id: e.target.dataset.id,
                name: cardBody.querySelector('.card-title').textContent,
                image: cardBody.querySelector('.card-img-top').src
            }

            // add to storage
            cocktailDB.saveIntoDB(drinkInfo);
        }
    }
}

// document ready
function documentReady() {
    const searchCategory = document.querySelector('.search-category');
    if(searchCategory) {
        ui.displayCategories();
    }

    // when favorites page
    const favoritesTable = document.querySelector('#favorites');
    if(favoritesTable) {
        // get the favorites from storage and display them
        const drinks = cocktailDB.getFromDB();
        ui.displayFavorites(drinks);

        // when view or delete is clicked
        favoritesTable.addEventListener('click', (e) => {
            e.preventDefault();

            // some delegations
            if(e.target.classList.contains('get-recipe')) {
                cocktailAPI.getSingleRecipe(e.target.dataset.id)
                .then(recipe => {
                    // display single recipe into a modal
                    ui.displaySingleRecipe(recipe.recipe.drinks[0]);
                })
            }

            // when removed button is clicked in favorites
            if(e.target.classList.contains('remove-recipe')) {
                ui.removeFavorite(e.target.parentElement.parentElement);

                // remove from db
                cocktailDB.removeFromDB(e.target.dataset.id);
            }
        })
    }
}