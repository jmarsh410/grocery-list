(function() {
	var app = angular.module('groceryList', []);

	var items = [
		{
			name: 'peaches'
		},
		{
			name: 'steak'
		},
		{
			name: 'asparagus'
		},

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
	
	app.controller('GroceryForm', function(){
		this.item = {};
		this.addItem = function(){
			items.push(this.item);
			this.item = {}; //resets item 
		};

		this.tab = 2;
		this.setTab = function(tabNumber){
			this.tab = tabNumber;
		};
		this.isSelected = function(checkTab){
			return this.tab === checkTab;
		};

		this.meals = meals;

		// meal-maker functions
		this.meal = {
			ingredients: [],
		};
		this.addMeal = function(){
			// push onto meals array, then push its ingredients onto the items array
			meals.push(this.meal);
			this.meal.ingredients.forEach(function(ingredient){
				items.push(ingredient);
			});
			this.meal = {
				ingredients: [],
			};
		};

		this.addMealToList = function(meal){
			meal.ingredients.forEach(function(ingredient){
				items.push(ingredient);
			});
			return meal;
		};

		//THOUGHT - combine function for adding item and meal
		// include if statement for distinguishing between them

		// ingredient functions for a meal
		this.ingredient = {};
		this.addIngr = function(){
			this.meal.ingredients.push(this.ingredient);
			this.ingredient = {};
		};
		this.removeIngr = function(ingredient){
			var ingrIndex = this.meal.ingredients.indexOf(ingredient);
			this.meal.ingredients.splice(ingrIndex, 1);
		};
	});

	app.controller('ListController', function(){
		this.products = items;
		this.removeProduct = function(product){
			var pIndex = items.indexOf(product);
			items.splice(pIndex, 1);
		};
	});
})();