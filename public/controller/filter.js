/**
 * Created by linux on 7/3/16.
 */
var filter = angular.module('App.filters', []);
filter.filter('range', function() {
    return function(input, total) {
        total = parseInt(total);

        for (var i=0; i<total; i++) {
            input.push(i);
        }

        return input;
    };
});


