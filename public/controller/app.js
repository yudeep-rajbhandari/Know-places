/**
 * Created by linux on 5/17/16.
 */

var app= angular.module('knowplaces', ['ui.router']);



app.config(["$stateProvider", "$urlRouterProvider", "$httpProvider", function ($stateProvider, $urlRouterProvider, $httpProvider) {


    $urlRouterProvider.otherwise('/homepage');
    $stateProvider

        // HOME STATES AND NESTED VIEWS =======================================

        .state('home', {
            url: '/home',
            templateUrl: 'templates/navbar.html'

        })
        .state('homepage', {

            url: '/homepage',
            templateUrl: 'templates/homepage.html'
        })

        .state('about', {

        url: '/about',
        templateUrl: 'templates/about.html'
    })
        .state('projects', {

            url: '/projects',
            templateUrl: 'templates/projects.html'
        })
        .state('contact', {

            url: '/contact',
            templateUrl: 'templates/contact.html'
        })
        .state('login', {

            url: '/login',
            templateUrl: 'templates/login.html'
        })


}])
