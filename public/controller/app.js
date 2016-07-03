/**
 * Created by linux on 5/17/16.
 */

var app= angular.module('knowplaces', ['ui.router','BackendService' ,'toaster', 'service.authorization','App.filters']);



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

        .state('home.places', {

            url: '/places/:district',
            templateUrl: 'templates/places.html',
            controller:"showplaceController"
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
                toaster.pop("success","info",response.data.message)
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
        $scope.places=[];
        $scope.showplace={};
        $scope.places=[];
        $scope.districts=["Achham","Arghakhanchi","Baglung","Baitadi","Bajhang","Bajura","Banke","Bara","Bardiya","Bhaktapur","Bhojpur","Chitwan","Dadeldhura","Dailekh","Dang","Darchula","Dhading","Dhankuta","Dhanusa","Dholkha","Dolpa","Doti","Gorkha","Gulmi","Humla","Ilam","Jajarkot","Jhapa","Jumla","Kailali","Kalikot","Kanchanpur","Kapilvastu","Kaski","Kathmandu","Kavrepalanchok","Khotang","Lalitpur","Lamjung","Mahottari","Makwanpur","Manang","Morang","Mugu","Mustang","Myagdi","Nawalparasi","Nuwakot","Okhaldhunga","Palpa","Panchthar","Parbat","Parsa","Pyuthan","Ramechhap","Rasuwa","Rautahat","Rolpa","Rukum","Rupandehi","Salyan","Sankhuwasabha","Saptari","Sarlahi","Sindhuli","Sindhupalchok","Siraha","Solukhumbu","Sunsari","Surkhet","Syangja","Tanahu","Taplejung","Terhathum","Udayapur"];
        $scope.addPlace=function() {
            service.save({addPlaces: $scope.addplace}, "/places/addPlace", function (err, response) {

                    if (err) {
                        throw (err);

                    }
                    if (!err) {
                        toaster.pop("success", "added successfully");
                        $state.go('home.homepage');

                    }
                    else {
                        console.log(response);
                    }
                }
            )
        }
       $scope.findPlaces=function(){
           console.log("<<<<");

           service.get('/places/findPlace',function(err,response){
               if(err){
                   throw (err);
               }
           if(!err){
               $scope.places=response.data.data;
           }
           })
       }

    }])

app.controller('showplaceController',['$scope', '$http', 'toaster', '$state', 'service','$stateParams',
    function ($scope, $http, toaster, $state, service, $stateParams) {
       $scope.places=[];
       $scope.numbers=$scope.places.length;



        if($stateParams.district){
        console.log($stateParams.district);
            service.get('/places/showPlaces/'+$stateParams.district,function(err,response){
                if(err){
                    throw(err)
                }
                if(!err){
                    $scope.places=response.data.data;
                    console.log($scope.places);
                }
            })
        }


    }
    ])



