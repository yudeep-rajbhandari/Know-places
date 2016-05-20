/**
 * Created by linux on 5/17/16.
 */

var app= angular.module('knowplaces', ['ui.router']);



app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home.homepage', {

            url: '/homepage',
            templateUrl: 'templates/homepage.html'
        })


        .state('home', {
            url: '/home',
            templateUrl: 'templates/navbar.html'

        })


});
