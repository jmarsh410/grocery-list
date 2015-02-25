(function() {
	var app = angular.module('groceryList', []);

	var items = [
		{
			name: 'peaches',
		}
	];

	var meals = [
		{
			name: 'Sriracha Lime Chicken',
			ingredients: [
				{
					name: 'chicken breasts',
				},
				{
					name: 'sriracha'
				},
				{
					name: 'limes'
				},
			],
		},
		{
			name: 'Balsamic Pork Roast',
			ingredients: [
				{
					name: 'Balsamic Vinegar',
				},
				{
					name: 'Pork Roast'
				},
				{
					name: 'White Onion'
				},
			],
		},
	];

	if (localStorage && localStorage.getItem('items')){
		//if items exists use items from local storage
	} else {
		// if items doesn't exist, create it
		localStorage.setItem('items', JSON.stringify(items));
		var localItems = JSON.parse(localStorage.getItem('items'));
		console.log(localItems);
	}

	

	
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

		this.meals = meals;
		this.addItem = function(){
			// array of available items
			var notOnList = this.checkList(this.item);
			// adds items to list
			notOnList.forEach(function(listItem){
				items.push(listItem);
				console.log(localItems);
			});
			if (this.item.type === 'single'){
				//resets item object
				this.item = {
					type: 'single',
				};
			} else if (this.item.type === 'meal'){ //otherwise, its a meal
				// push onto meals array, then push its ingredients onto the items array
				meals.push(this.item);

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

		//returns array of ingredients that aren't on the list
		this.checkList = function(itemOrIngredient){
			// new array of all object's names in items array
			var itemNames = items.map(function(item){
				return item.name;
			});

			if (this.item.type === 'meal') { //if it has ingredients, its a meal
				// returns new array of ingredients NOT on items array
				var notOnList = itemOrIngredient.ingredients.map(function(ingredient){
					if (itemNames.indexOf(ingredient.name) === -1) {
						return ingredient;
					}
				});
				return notOnList;
			} else { // otherwise, its a single item
				if (itemNames.indexOf(itemOrIngredient.name) === -1) {
					return new Array(itemOrIngredient);
				} else {
					return [];
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
				};
			},
			controllerAs: 'list',
		};
	});
})();