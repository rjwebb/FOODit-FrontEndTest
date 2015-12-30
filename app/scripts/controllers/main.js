'use strict';

/**
 * @ngdoc function
 * @name jstestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jstestApp
 */
angular.module('jstestApp')
    .controller('MainCtrl', ['$scope', 'MenuService', function ($scope, MenuService) {
	$scope.menu = {};
	var menu_lookup = {}
	MenuService.get('/data/menu.json').success(function(data) {
	    $scope.menu = data;
	});

	$scope.basket = [];

	$scope.total_price = 0;

	$scope.add_to_basket = function(item_id){
	    var meals = $scope.menu.meals;

	    var item;
	    for(var i=0; i < meals.length; i++){
		if(meals[i].id == item_id){
		    item = meals[i];
		    break;
		}
	    }

	    $scope.basket.push(item);
	    $scope.total_price += parseFloat(item.price);
	};
    }
]);
