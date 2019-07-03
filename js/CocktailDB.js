class CocktailDB {

    // remove from database
    removeFromDB(id) {
        const drinks = this.getFromDB();

        drinks.forEach((drink, index) => {
            if(id === drink.id) {
                drinks.splice(index, 1);
            }
        });
        localStorage.setItem('drinks', JSON.stringify(drinks));

    }

    // save into database
    saveIntoDB(drink) {
        const drinks = this.getFromDB();x
        drinks.push(drink);

        localStorage.setItem('drinks', JSON.stringify(drinks));
    }

    // return recipes from storage
    getFromDB() {
        let drinks;
        // check from local storage
        if(localStorage.getItem('drinks') === null) {
            drinks = [];
        } else {
            drinks = JSON.parse(localStorage.getItem('drinks'));
        }
        return drinks;
    }
}