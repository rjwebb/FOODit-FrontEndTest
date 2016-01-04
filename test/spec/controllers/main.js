'use strict';

describe('Controller: MainCtrl', function () {

    // load the controller's module
    beforeEach(module('jstestApp'));

    var MainCtrl, scope, MenuService;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $injector) {
    scope = $rootScope.$new();
	MenuService = $injector.get('MenuService');
	var success = function(func) {
	    return func({resultCount: 1,
			offset: 0,
			pageSize: 20,
			meals: [
			    {
				id: "meal001",
				name: "pizza",
				description: "this is a very nice pizza",
				price: "10.50",
				primaryImageUrl: "http://lh5.ggpht.com/ASTYH5ZbfNpA5MOxUya9MfOXw8910PpbcvkAWeMFbjurfYvbqx1qnfLU091k3UyxGXUYDn_dNOMRsmCIE2ozwRAd",
				"tags": ["seafood"]
			    },
			    {
				id: "meal002",
				name: "burger",
				description: "this is best burger",
				price: "7.25",
				primaryImageUrl: "http://lh5.ggpht.com/ASTYH5ZbfNpA5MOxUya9MfOXw8910PpbcvkAWeMFbjurfYvbqx1qnfLU091k3UyxGXUYDn_dNOMRsmCIE2ozwRAd",
				"tags": ["meat"]
			    }
			]});
	};
	spyOn(MenuService, 'get').and.returnValue({success: success});

	MainCtrl = $controller('MainCtrl', {
	    $scope: scope
	});
    }));


    it('should call the menu service to retrieve a list of meals', function () {
	expect(MenuService.get).toHaveBeenCalled();
	expect(scope.menu.resultCount).toBe(1);
    });

    it('should initially have an empty basket', function() {
	expect(scope.basket.length).toBe(0);
    });

    it('should have the correct price and number of items, when adding and removing kind of meal to the basket', function() {
	var meals = scope.menu.meals;
	var meal = meals[0];
	var price = parseFloat(meal.price);

	// add the item to the basket
	scope.addToBasket(meal.id);
	expect(scope.totalPrice).toBe(price);
	expect(scope.basket.length).toBe(1);

	// add it to the basket again
	scope.addToBasket(meal.id);
	expect(scope.totalPrice).toBe(price * 2);
	// basket length = number of distinct items
	expect(scope.basket.length).toBe(1);

	// remove from basket
	scope.removeFromBasket(meal.id);
	expect(scope.totalPrice).toBe(price);
	expect(scope.basket.length).toBe(1);

	scope.removeFromBasket(meal.id);
	expect(scope.totalPrice).toBe(0);
	expect(scope.basket.length).toBe(0);
    });

    it('should have the correct price and number of items, when adding/removing multiple different items to the basket', function() {
	var meals = scope.menu.meals;
	var meal1 = meals[0];
	var meal2 = meals[1];
	var price1 = parseFloat(meal1.price);
	var price2 = parseFloat(meal2.price);


	scope.addToBasket(meal1.id);
	expect(scope.basket.length).toBe(1);
	expect(scope.totalPrice).toBe(price1);

	scope.addToBasket(meal2.id);
	expect(scope.basket.length).toBe(2);
	expect(scope.totalPrice).toBe(price1 + price2);

	scope.addToBasket(meal1.id);
	expect(scope.totalPrice).toBe(price1*2 + price2);
	expect(scope.basket.length).toBe(2);

	scope.addToBasket(meal2.id);
	expect(scope.totalPrice).toBe(price1*2 + price2*2);
	expect(scope.basket.length).toBe(2);

	scope.removeFromBasket(meal1.id);
	expect(scope.totalPrice).toBe(price1 + price2*2);
	expect(scope.basket.length).toBe(2);

	scope.removeFromBasket(meal2.id);
	expect(scope.totalPrice).toBe(price1 + price2);
	expect(scope.basket.length).toBe(2);

	scope.removeFromBasket(meal2.id);
	expect(scope.totalPrice).toBe(price1);
	expect(scope.basket.length).toBe(1);

	scope.removeFromBasket(meal1.id);
	expect(scope.totalPrice).toBe(0);
	expect(scope.basket.length).toBe(0);
    });


    it('should initially hide the basket', function() {
	expect(scope.hideBasket).toBe(true);
    });

    it('should toggle the basket correctly', function() {
	scope.toggleHideBasket();
	expect(scope.hideBasket).toBe(false);

	scope.toggleHideBasket();
	expect(scope.hideBasket).toBe(true);
    });


    it('should hide the basket, when the basket is emptied', function() {
	expect(scope.hideBasket).toBe(true);

	var meals = scope.menu.meals;
	var meal = meals[0];

	scope.addToBasket(meal.id);
	expect(scope.hideBasket).toBe(true);

	scope.toggleHideBasket();
	expect(scope.hideBasket).toBe(false);

	scope.removeFromBasket(meal.id);
	expect(scope.hideBasket).toBe(true);
    });
});
