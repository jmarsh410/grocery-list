!function(){var e=angular.module("groceryList",[]),t=[{name:"peaches"},{name:"steak"},{name:"asparagus"}],i=[{name:"Sriracha Lime Chicken",ingredients:[{name:"chicken breasts"},{name:"sriracha"},{name:"limes"}]},{name:"Balsamic Pork Roast",ingredients:[{name:"Balsamic Vinegar"},{name:"Pork Roast"},{name:"White Onion"}]}];e.controller("GroceryForm",function(){this.item={},this.addItem=function(){t.push(this.item),this.item={}},this.tab=1,this.setTab=function(e){this.tab=e},this.isSelected=function(e){return this.tab===e},this.meals=i,this.meal={ingredients:[]},this.addMeal=function(){i.push(this.meal),this.meal.ingredients.forEach(function(e){t.push(e)}),this.meal={ingredients:[]}},this.addMealToList=function(e){return e.ingredients.forEach(function(e){t.push(e)}),e},this.ingredient={},this.addIngr=function(){this.meal.ingredients.push(this.ingredient),this.ingredient={}},this.removeIngr=function(e){var t=this.meal.ingredients.indexOf(e);this.meal.ingredients.splice(t,1)}}),e.directive("singleItem",function(){return{restrict:"E",templateUrl:"templates/single-item.html"}}),e.directive("meals",function(){return{restrict:"E",templateUrl:"templates/meals.html"}}),e.directive("populatedList",function(){return{restrict:"E",templateUrl:"templates/populated-list.html",controller:function(){this.products=t,this.removeProduct=function(e){var i=t.indexOf(e);t.splice(i,1)}},controllerAs:"list"}})}();