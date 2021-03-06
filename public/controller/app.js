/**
 * Created by linux on 5/17/16.
 */

var app = angular.module('knowplaces', ['ui.router', 'BackendService', 'toaster', 'service.authorization', 'App.filters', 'directive.map', 'directive.map1','directive.map12']);

app.run(function (principal, $rootScope) {
    principal.identity().then(function (data) {
        console.log(data)
        if (data) {
            $rootScope.userData = data;
        }
    })
})

app.config(["$stateProvider", "$urlRouterProvider", "$httpProvider", function ($stateProvider, $urlRouterProvider, $httpProvider) {


    $urlRouterProvider.otherwise('/home/homepage');
    $stateProvider

        // HOME STATES AND NESTED VIEWS =======================================

        .state('home', {
            abstract: true,
            url: '/home',
            templateUrl: 'templates/navbar.html',
            data: {
                roles: []
            },
            controller: 'signUpController'

        })
        .state('home.homepage', {

            url: '/homepage',
            templateUrl: 'templates/homepage.html',

            controller: "placeController",
            data: {
                roles: []
            }
        })

        .state('home.about', {

            url: '/about',
            templateUrl: 'templates/about.html',
            data: {
                roles: []
            }
        })
        .state('home.projects', {

            url: '/projects',
            templateUrl: 'templates/projects.html',
            data: {
                roles: []
            }
        })


        .state('home.contact', {

            url: '/contact',
            templateUrl: 'templates/contact.html',
            data: {
                roles: []
            }
        })
        .state('home.login', {

            url: '/login',
            templateUrl: 'templates/login.html',
            controller: "signUpController",
            data: {
                roles: []
            }
        })
        .state('home.showfullStories', {

            url: '/showstories/:storiesid',
            templateUrl: 'templates/showfullStories.html',
            controller: "showplaceController",
            data: {
                roles: []
            }
        })

        .state('home.storylist', {

            url: '/storylist',
            templateUrl: 'templates/storylist.html',
            controller: "showplaceController",
            data: {
                roles: []
            }
        })

        .state('home.dhulikhel', {

            url: '/dhulikhel',
            templateUrl: 'templates/dhulikhel.html'
        })
        .state('home.sidebar', {

            url: '/sidebar',
            templateUrl: 'templates/sidebar.html',
            data: {
                roles: []
            }
        })

        .state('home.seeRequest', {

            url: '/seeRequest',
            templateUrl: 'templates/seeRequest.html',

            data: {
                roles: ['admin']
            }
        })
        .state('home.requestPost', {

            url: '/requestPost/:placeid',
            templateUrl: 'templates/requestPost.html',
            controller: 'RequestController',
            data: {
                roles: ['admin']
            }


        })
        .state('home.form', {

            url: '/form',
            templateUrl: 'templates/newform.html',
            controller: "signUpController",
            data: {
                roles: []
            }
        })
        .state('home.profile', {

            url: '/profile',
            templateUrl: 'templates/profile.html',
            controller: "signUpController",
            data: {
                roles: []
            }
        })
        .state('home.addplace', {

            url: '/addplace',
            templateUrl: 'templates/addplace.html',
            controller: "placeController",
            data: {
                roles: ['user']
            }
        })
        .state('home.travelQ', {

            url: '/travelQ',
            templateUrl: 'templates/travelQ.html',
            controller: "placeController",
            data: {
                roles: ['user']
            }
        })

        .state('home.places', {

            url: '/places/:district',
            templateUrl: 'templates/placesList.html',
            controller: "showplaceController",
            data: {
                roles: []
            }
        })
        .state('home.showplaces', {

            url: '/showplaces/:placeid',
            templateUrl: 'templates/places.html',
            controller: "showplaceController",
            data: {
                roles: []
            }
        })

        .state('home.stories', {

            url: '/stories',
            templateUrl: 'templates/stories.html',
            controller: "showplaceController",
            data: {
                roles: []
            }
        })
        .state('home.places1', {

            url: '/places1/:category',
            templateUrl: 'templates/listC.html',
            controller: "showplaceController",
            data: {
                roles: []
            }
        })
        .state('home.search', {

            url: '/search',
            templateUrl: 'templates/search.html',
            controller: "placeController",
            data: {
                roles: []
            }
        })

}])

app.controller('signUpController', ['$scope', '$http', 'toaster', '$state', 'principal', 'service', '$rootScope', '$stateParams',
        function ($scope, $http, toaster, $state, principal, service, $rootScope, $stateParams) {
            $scope.formdata = {};
            $scope.getInfo = function () {

                service.save({userdata: $scope.formdata}, "/users/signup", function (err, response) {
                    if (!err) {
                        $scope.response = response;

                        console.log(response);
                        toaster.pop("success", "info", response.data.message)
                        $state.go("home.profile");

                    } else {
                        console.log(response);
                    }

                })

            }

            $scope.check = function () {
                if ($scope.formdata.password != $scope.formdata.password1) {

                    $scope.pass12 = true;
                }

            }

            $scope.checkForm = function () {
                service.save({user: $scope.formdata}, "/users/login", function (err, response) {

                    if (!err) {

                        if (response.data.user) {
                            var userData={
                                userid: response.data.user._id, roles: response.data.user.role,
                                username: response.data.user.name
                            }
                            principal.authenticate(userData);

                            $rootScope.userData=userData;


                            $state.go('home.homepage');
                        }
                        else {

                            toaster.pop('success', "oops", "wrong username or password");
                        }

                    } else {

                        console.log(response);
                    }

                })
            }
            $scope.Requests = function () {
                service.get('/places/Requests', function (err, response) {
                    if (err) {
                        throw(err)

                    }
                    if (!err) {
                        console.log("<<<<<<")
                        $scope.seeRequest = response.data.data;
                        $state.go('home.seeRequest')
                    }
                })
            }

            $scope.logout = function () {
                console.log('<<<<<<<<<');
                principal.authenticate(null);
                $rootScope.userData = null;


            }


        }]
)

app.controller('placeController', ['$scope', '$http', 'toaster', '$state', 'principal', 'service', '$rootScope',
    function ($scope, $http, toaster, $state, principal, service, $rootScope, directive) {
        $scope.addplace = {};
        $scope.places = [];
        $scope.Traveldetails={};
        $scope.showplace = {};
        $scope.places = [];
        $scope.districts = ["Achham", "Arghakhanchi", "Baglung", "Baitadi", "Bajhang", "Bajura", "Banke", "Bara", "Bardiya", "Bhaktapur", "Bhojpur", "Chitwan", "Dadeldhura", "Dailekh", "Dang", "Darchula", "Dhading", "Dhankuta", "Dhanusa", "Dholkha", "Dolpa", "Doti", "Gorkha", "Gulmi", "Humla", "Ilam", "Jajarkot", "Jhapa", "Jumla", "Kailali", "Kalikot", "Kanchanpur", "Kapilvastu", "Kaski", "Kathmandu", "Kavrepalanchok", "Khotang", "Lalitpur", "Lamjung", "Mahottari", "Makwanpur", "Manang", "Morang", "Mugu", "Mustang", "Myagdi", "Nawalparasi", "Nuwakot", "Okhaldhunga", "Palpa", "Panchthar", "Parbat", "Parsa", "Pyuthan", "Ramechhap", "Rasuwa", "Rautahat", "Rolpa", "Rukum", "Rupandehi", "Salyan", "Sankhuwasabha", "Saptari", "Sarlahi", "Sindhuli", "Sindhupalchok", "Siraha", "Solukhumbu", "Sunsari", "Surkhet", "Syangja", "Tanahu", "Taplejung", "Terhathum", "Udayapur"];
        $rootScope.categories = ["rafting", "hiking", "sightseeing","NationalPark"]

        $scope.savePlace = function () {
            service.save(_.assign({addPlaces: $scope.addplace}, {userid: $rootScope.data.userid}), "/places/savePlace", function (err, response) {

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
$scope.Traveldiaries=function(){
console.log($scope.Traveldetails);
    service.save({addTravel:$scope.Traveldetails},'/userPlaces/addtravel',function(err,data){

        if(err){
            throw(err);
        }
        if(!err){
            toaster.pop("success","successfully added");
            $state.go("home.homepage");
        }
    })
}
        $scope.addPlace = function () {
            $scope.addplace.userid = $rootScope.userData.userid;
            console.log($scope.addplace)
            service.save({addPlaces: $scope.addplace}, "/places/addPlace",
                function (err, response) {


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
$scope.placesaround=function(){
var position={};
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position);
            console.log(position.coords.latitude);



    service.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+position.coords.latitude,+position.coords.longitude,'&radius=500&types=food&key=AIzaSyDTyk7Gss0v-3rdc9XZZdCR-3tiLVwWcWk',function(err,response){

    })
})
    }

}

        $scope.findPlaces = function () {
            console.log("<<<<");

            service.get('/places/findPlace', function (err, response) {
                if (err) {
                    throw (err);
                }
                if (!err) {
                    $scope.places = response.data.data;
                }
            })
        }
        $scope.getDistrict = function () {
            console.log("<<<<<<<<<<")
            service.get('/places/getDistrict', function (err, response) {
                if (err) {
                    throw(err)
                }
                if (!err) {
                    $scope.District = response.data.data;
                    console.log($scope.District);
                }
            })
        }

    }])

app.controller('showplaceController', ['$scope', '$http', 'toaster', '$state', 'service', '$stateParams', '$rootScope',
    function ($scope, $http, toaster, $state, service, $stateParams, $rootScope) {
        $scope.places = [];
        $scope.delete = {};


        if ($stateParams.district) {
            console.log($stateParams.district);
            service.get('/places/listPlaces/' + $stateParams.district, function (err, response) {
                if (err) {
                    throw(err)
                }
                if (!err) {
                    $scope.places = response.data.data;
                    $scope.numbers = $scope.places.length;

                }
            })
        }
        if ($stateParams.storiesid) {
            console.log($stateParams.storiesid);
            service.get('/userPlaces/showfullstories/' + $stateParams.storiesid, function (err, response) {
                if (err) {
                    throw(err)
                }
                if (!err) {
                    $scope.fullstories = response.data.data;


                    $scope.deleteItem = $stateParams.storiesid;


                }
            })
        }
        $scope.showstories=function(){

            service.get('/userPlaces/storiesList',function(err,response){
                if(err){
                    throw (err)
                }
                if(!err){
                    $rootScope.storiesList=response.data.data;
                }
            })
        }
        $scope.showstories();


        if ($stateParams.placeid) {

            service.get('/places/showPlaces/' + $stateParams.placeid, function (err, response) {
                if (err) {
                    throw(err)
                }
                if (!err) {
                    $scope.places = response.data.data;
                    console.log($scope.places);

                    var location={lat1:$scope.places[0].latitude,lng1:$scope.places[0].longitude};
                    console.log(location);

                    $scope.deleteItem = $stateParams.placeid;

                }
            })
        }

        if ($stateParams.category) {
            console.log($stateParams.category);
            service.get('/places/showPlaces1/' + $stateParams.category, function (err, response) {
                if (err) {
                    throw(err)
                }
                if (!err) {
                    $scope.places = response.data.data;
                    $scope.numbers = $scope.places.length;
                    console.log($scope.places);
                    $scope.deleteItem = $stateParams.placeid;

                }
            })
        }


        $scope.deleteIt = function () {
            console.log(">>>>>>")
            console.log($scope.deleteItem);
            service.delete({user: $scope.deleteItem}, "/places/deleteItem", function (err, response) {
                if (err) {
                    throw(err)
                }
                if (!err) {
                    toaster.pop("success", "item deleted");
                    console.log(response);
                    $state.go('home.search')
                }
            })
        }

        $scope.deleteIt1 = function () {
            console.log(">>>>>>")
            console.log($scope.deleteItem);
            service.delete({user: $scope.deleteItem}, "/userPlaces/deleteItem1", function (err, response) {
                if (err) {
                    throw(err)
                }
                if (!err) {
                    toaster.pop("success", "item deleted");
                    console.log(response);
                    $state.go('home.search')
                }
            })
        }


    }
])
app.controller('RequestController', ['$scope', '$http', 'toaster', '$state', 'principal', 'service', '$rootScope', '$stateParams',
    function ($scope, $http, toaster, $state, principal, service, $rootScope, $stateParams) {


        if ($stateParams.placeid) {
            console.log('this is');
            service.get('/places/showPlaces12/' + $stateParams.placeid, function (err, response) {
                if (err) {
                    throw(err)
                }
                if (!err) {
                    $scope.seeRequest = response.data.data;


                    $scope.deleteItem = $stateParams.placeid;


                }
            })
        }


        $scope.deleteIt = function () {
            console.log(">>>>>>")
            console.log($scope.deleteItem);
            service.delete({user: $scope.deleteItem}, "/places/deleteItem", function (err, response) {
                if (err) {
                    throw(err)
                }
                if (!err) {
                    toaster.pop("success", "item deleted");
                    console.log(response);
                    $state.go('home.search')
                }
            })
        }
        $scope.postIt = function () {
            console.log('postIt')
            service.put("/places/updateRequest/" + $scope.deleteItem, function (err, response) {
                if (!err) {


                    toaster.pop('successful');
                    $rootScope.$broadcast('deleteItem');


                } else {

                    console.log(response);
                }

            })


        }

    }
])


