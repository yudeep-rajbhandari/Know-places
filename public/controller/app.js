/**
 * Created by linux on 5/17/16.
 */

var app= angular.module('knowplaces', ['ui.router']);



app.config(["$stateProvider", "$urlRouterProvider", "$httpProvider", function ($stateProvider, $urlRouterProvider, $httpProvider) {


    $urlRouterProvider.otherwise('/home/homepage');
    $stateProvider

        // HOME STATES AND NESTED VIEWS =======================================

        .state('home', {
            abstract:true,
            url: '/home',
            templateUrl: 'templates/navbar.html'

        })
        .state('home.homepage', {

            url: '/homepage',
            templateUrl: 'templates/homepage.html'
        })

        .state('home.about', {

        url: '/about',
        templateUrl: 'templates/about.html'
    })
        .state('home.projects', {

            url: '/projects',
            templateUrl: 'templates/projects.html'
        })
        .state('home.contact', {

            url: '/contact',
            templateUrl: 'templates/contact.html'
        })
        .state('home.login', {

            url: '/login',
            templateUrl: 'templates/login.html'
        })

        .state('home.dhulikhel', {

            url: '/dhulikhel',
            templateUrl: 'templates/dhulikhel.html'
        })
        .state('home.sidebar', {

            url: '/sidebar',
            templateUrl: 'templates/sidebar.html'
        })
        .state('home.form', {

            url: '/form',
            templateUrl: 'templates/form.html'
        })


}])

