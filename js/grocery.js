(function() {
	var app = angular.module('groceryList', ['ngAnimate']);

	if (localStorage && localStorage.getItem('items')){
		//if items exists use items from local storage
		var items = JSON.parse(localStorage.getItem('items'));
	} else {
		// if items doesn't exist, create it
		var items = [];
	}
	if (localStorage && localStorage.getItem('meals')){
		//if items exists use items from local storage
		var meals = JSON.parse(localStorage.getItem('meals'));
	} else {
		// if items doesn't exist, create it
		var meals = [];
	}
	// localStorage.clear();
	
	// object that will hold notOnList and onList arrays
	var onAndOff = {};
	onAndOff.notOnList = [];
	onAndOff.onList = [];
	
	app.controller('GroceryForm', function(){
		
		// our item object
		this.item = {
			// type: "",
			// name: "",
			// ingredients: [],
			// onList: "",
		};

		// takes care of tabs AND item type
		// AND creating item.ingredients array
		this.tab = 1; //initializes tab #
		this.item.type = 'single'; //initializes item type
		this.setTab = function(tabNumber){
			this.tab = tabNumber;
			if (this.tab === 1) {
				this.item.type = 'single';
			} else {
				this.item.type = 'meal';
				this.item.ingredients = [];
			}
		};
		// used for adding active class to nav tabs
		this.isSelected = function(checkTab){
			return this.tab === checkTab;
		};

		this.meals = meals; // allows app to print all the meals in the meals list
		this.addItem = function(){
			// clear the onAndOff arrays before you cycle through everything
			// cannot simply set the array to empty, because we referenced it earlier
			onAndOff.notOnList.length = 0;
			onAndOff.onList.length = 0;

			// array of available items
			this.checkList(this.item);
			// adds items to list
			onAndOff.notOnList.forEach(function(listItem){
				items.push(listItem);
			});
			// updates localStorage object
			localStorage.setItem('items', JSON.stringify(items)); //adds item to items array in local storage
			if (this.item.type === 'single'){
				//resets item object
				this.item = {
					type: 'single',
				};
			} else if (this.item.type === 'meal'){ //otherwise, its a meal
				// push onto meals array
				meals.push(this.item);
				// console.log(meals);
				// console.log(this.meals);

				// updates meals array on localStorage object
				localStorage.setItem('meals', JSON.stringify(meals)); //adds item to items array in local storage

				// resets item object
				this.item = {
					type: 'meal',
					ingredients: [],
				};
			} else {
				throw new Error("item.type is " + this.item.type);
			}
		};

		this.addMealToList = function(meal){
			// array of all object's names in items array
			var itemNames = items.map(function(item){
				return item.name;
			});
			// goes over every ingredient, if it isn't already in items, then it is added
			meal.ingredients.forEach(function(ingredient){
				if (itemNames.indexOf(ingredient.name) === -1) {
					items.push(ingredient);
				}
			});
			// return meal;
		};

		//returns object which holds arrays of ingredients that are on and off the list
		this.checkList = function(mealOrIngredient){
			// new array of all object's names in items array
			var itemNames = items.map(function(item){
				return item.name;
			});

			if (this.item.type === 'meal') {
				// pushes names into appropriate array
				mealOrIngredient.ingredients.forEach(function(ingredient){
					if (itemNames.indexOf(ingredient.name) === -1) {
						onAndOff.notOnList.push(ingredient);
					} else {
						onAndOff.onList.push(ingredient);
					}
				});
			} else { // otherwise, its a single item
				if (itemNames.indexOf(mealOrIngredient.name) === -1) {
					onAndOff.notOnList.push(mealOrIngredient);
				} else {
					onAndOff.onList.push(mealOrIngredient);
				}
			} 
		};

		// disables "add meal" button if meal lacks ingredients
		this.isDisabled = function(){
			// first, ingredients must exist in the object, then it must equal 0
			return this.item.ingredients && this.item.ingredients.length === 0;
		};

		// ingredient functions for a meal
		this.ingredient = {
			// name: "",
		};
		this.addIngr = function(){
			this.item.ingredients.push(this.ingredient);
			this.ingredient = {};
		};
		this.removeIngr = function(ingredient){
			var ingrIndex = this.item.ingredients.indexOf(ingredient);
			this.item.ingredients.splice(ingrIndex, 1);
		};
	});

	app.directive('duplicates', function(){
		return {
			restrict: 'E',
			templateUrl: 'templates/duplicates.html',
			controller: function(){
				this.onList = onAndOff.onList;
			},
			controllerAs: 'dup',
		};
	});

	app.directive('singleItem', function(){
		return {
			restrict: 'E',
			templateUrl: 'templates/single-item.html',
		};
	});

	app.directive('meals', function(){
		return {
			restrict: 'E',
			templateUrl: 'templates/meals.html'
		};
	});

	app.directive('populatedList', function(){
		return {
			restrict: 'E',
			templateUrl: 'templates/populated-list.html',
			controller: function(){
				this.products = items;
				this.removeProduct = function(product){
					var pIndex = items.indexOf(product);
					items.splice(pIndex, 1);
					localStorage.setItem('items', JSON.stringify(items)); //adds item to items array in local storage
				};
			},
			controllerAs: 'list',
		};
	});

})();