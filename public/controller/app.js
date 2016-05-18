/**
 * Created by linux on 5/17/16.
 */

var app= angular.module('knowplaces', ['ui.router']);



app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            //abstract: true,
            url: '/home',
            templateUrl: 'templates/homepage.html'
        })

        // nested list with custom controller
        .state('list', {
            url: '/list',
            templateUrl: 'templates/app.html',

        })


});
