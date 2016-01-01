'use strict';

function findById(list, id){
    var i = 0;
    while(i < list.length && list[i].id !== id){
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

	$scope.totalPrice = 0;

	$scope.addToBasket = function(itemId){
	    // try to find the item in the basket
	    var i = findById($scope.basket, itemId);

	    // if it is in the basket
	    if(typeof i !== 'undefined'){
		// then just increment the counter
		$scope.basket[i].quantity += 1;

		$scope.totalPrice += parseFloat($scope.basket[i].price);
	    }else{
		// otherwise add it to the basket
		var meals = $scope.menu.meals;
		var item = meals[ findById(meals, itemId) ];
		var l = $scope.basket.push( item );
		$scope.basket[l - 1].quantity = 1;

		$scope.totalPrice += parseFloat(item.price);
	    }
	};

	$scope.removeFromBasket = function(itemId){
	    // try to find the item in the basket
	    var i = findById($scope.basket, itemId);

	    // can only remove an item if it is in the basket
	    if(typeof i !== 'undefined'){
		var price = $scope.basket[i].price;

		if($scope.basket[i].quantity === 1){
		    // remove the thing from the basket altogether
		    $scope.basket.splice(i, 1);
		}else{
		    // just decrement the counter
		    $scope.basket[i].quantity -= 1;
		}

		$scope.totalPrice -= price;

		if($scope.basket.length === 0){
		    $scope.hideBasket = true;
		}
	    }else{
		console.log('not found: '+itemId);
	    }
	};

	$scope.hideBasket = true;
	$scope.toggleHideBasket = function(){
	    $scope.hideBasket = $scope.hideBasket === false ? true: false;
	};
    }
]);
