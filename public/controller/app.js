/**
 * Created by linux on 5/17/16.
 */

var app= angular.module('knowplaces', ['ui.router','BackendService' ,'toaster', 'service.authorization']);



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
            templateUrl: 'templates/homepage.html',
            controller:"placeController"
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
            templateUrl: 'templates/login.html',
            controller:"signUpController"
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
            templateUrl: 'templates/newform.html',
            controller:"signUpController"
        })
        .state('home.profile', {

            url: '/profile',
            templateUrl: 'templates/profile.html',
            controller:"signUpController"
        })
        .state('home.addplace', {

            url: '/addplace',
            templateUrl: 'templates/addplace.html',
            controller:"placeController"
        })


}])

app.controller('signUpController',['$scope', '$http', 'toaster', '$state', 'principal', 'service', '$rootScope',
    function ($scope, $http, toaster, $state, principal, service, $rootScope) {
    $scope.formdata={};
$scope.getInfo=function(){

        service.save({userdata: $scope.formdata}, "/users/signup", function (err, response) {
            if (!err) {
                $scope.response = response;

                console.log(response);
                $state.go("home.profile");

            } else {
                console.log(response);
            }

        })

    }



    $scope.checkForm = function () {
        service.save({user: $scope.formdata}, "/users/login", function (err, response) {

            if (!err) {

                if (response.data.user) {

                    $state.go('home.profile');
                }
                else {

                    toaster.pop('success', "oops", "wrong username or password");
                }

            } else {

                console.log(response);
            }

        })
    }
    $scope.logout = function () {
        principal.authenticate('');
        $state.go('home.homepage');
    }


}]

)

app.controller('placeController',['$scope', '$http', 'toaster', '$state', 'principal', 'service', '$rootScope',
    function ($scope, $http, toaster, $state, principal, service, $rootScope) {
        $scope.addplace={};
        $scope.place=[];
        $scope.addPlace=function(){
            service.save({addPlaces:$scope.addplace},"/places/addPlace",function(err,response) {

                    if (err) {
                        throw (err);

                    }
                if(!err){
                    toaster.pop("success","added successfully");
                    $state.go('home.homepage');

                }
                    else{
                    console.log(response);
                }
                }
            )

       $scope.findPlaces=function(){

           service.get('/places/findPlace',function(err,response){
               if(err){
                   throw (err);
               }
           if(!err){
               $scope.place=response.data.data;
           }
           })
       }
        }
    }])
