'use strict';

function find_by_id(list, id){
    var i = 0;
    while(i < list.length && list[i].id != id){
	i++;
    }
    if(i < list.length){
	return i;
    }else{
	return undefined;
    }
}

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

	MenuService.get('/data/menu.json').success(function(data) {
	    $scope.menu = data;
	});

	$scope.basket = [];

	$scope.total_price = 0;

	$scope.add_to_basket = function(item_id){
	    // try to find the item in the basket
	    var i = find_by_id($scope.basket, item_id);

	    // if it is in the basket
	    if(typeof i != "undefined"){
		// then just increment the counter
		$scope.basket[i].quantity += 1;

		$scope.total_price += parseFloat($scope.basket[i].price);
	    }else{
		// otherwise add it to the basket
		var meals = $scope.menu.meals;
		var item = meals[ find_by_id(meals, item_id) ];
		var l = $scope.basket.push( item );
		$scope.basket[l - 1].quantity = 1;

		$scope.total_price += parseFloat(item.price);
	    }
	};

	$scope.remove_from_basket = function(item_id){
	    // try to find the item in the basket
	    var i = find_by_id($scope.basket, item_id);

	    // if it is in the basket
	    if(typeof i != "undefined"){
		var price = $scope.basket[i].price

		if($scope.basket[i].quantity == 1){
		    // remove the thing from the basket altogether
		    $scope.basket.splice(i, 1);
		}else{
		    // just decrement the counter
		    $scope.basket[i].quantity -= 1;
		}

		$scope.total_price -= price;

		if($scope.basket.length == 0){
		    $scope.hide_basket = true;
		}
	    }else{
		console.log("not found: "+item_id);
	    }
	    // if it is not in the basket, do nothing as this operation is redundant
	}

	$scope.hide_basket = true;
	$scope.toggle_hide_basket = function(){
	    $scope.hide_basket = $scope.hide_basket === false ? true: false;
	}
    }
]);
