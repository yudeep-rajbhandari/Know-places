/**
 * Created by linux on 5/17/16.
 */

var app= angular.module('knowplaces', ['ui.router','BackendService']);



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
            templateUrl: 'templates/form.html',
            controller:"signUpController"
        })
        .state('home.profile', {

            url: '/profile',
            templateUrl: 'templates/profile.html',
            controller:"signUpController"
        })


}])

app.controller('signUpController',['$scope','$http','service','$state',
function($scope,$http,service,$state){
    $scope.formdata={};
$scope.getInfo=function(){
    service.save({userdata:$scope.formdata},"/users/signup",function(err,response){
        if (!err) {
            $scope.response = response;
            console.log(response);
            $state.go("home.profile");


        } else {
            console.log(response);
        }

    })


    }
}]

)