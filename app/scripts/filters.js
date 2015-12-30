'use strict';

angular.module('jstestFilters', []).filter('is_tag', function() {
    return function(input) {
	var tags = ['charcoal', 'cheese', 'chicken', 'grilled', 'high-protein', 'lamb', 'pasta', 'peanut', 'pork', 'seafood', 'snack', 'spicy', 'starter', 'sweet', 'vegetarian'];

	var out = [];
	for(var i=0; i < input.length; i++){
	    if(tags.includes(input[i])){
		out.push(input[i]);
	    }
	}

	return out;
    };
});
