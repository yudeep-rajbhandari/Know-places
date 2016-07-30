angular.module('directive.map12', [])
    .directive('maps12', function () {
        return {
            scope: {
                'ngModel': "="
            },
            restrict: 'EA',
            link: function (scope, element, attrs) {
                var pos={};

                var directionsService = new google.maps.DirectionsService;
                var directionsDisplay = new google.maps.DirectionsRenderer;

                scope.$watch('ngModel',function(newValue,oldValue) {
                    if (newValue.length > 0) {

                        console.log(newValue);
                        var map = new google.maps.Map(element[0], {
                            center: {lat: -34.397, lng: 150.644},
                            zoom: 15
                        });
                        if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition(function (position) {
                                console.log(position);

                                var pos = {

                                    lat: position.coords.latitude,
                                    lng: position.coords.longitude

                                };
                                    console.log(pos);
                                calculateAndDisplayRoute(directionsService, directionsDisplay,pos);
                            })
                        }

                        directionsDisplay.setMap(map);


                        function calculateAndDisplayRoute(directionsService, directionsDisplay,pos) {
                            console.log(pos);


                            directionsService.route({
                                origin:{lat:pos.lat,lng:pos.lng},
                                destination:{lat:newValue[0].latitude,lng:newValue[0].longitude},
                                travelMode: 'WALKING'
                            }, function (response, status) {
                                if (status === 'OK') {
                                    directionsDisplay.setDirections(response);
                                } else {
                                    window.alert('Directions request failed due to ' + status);
                                }
                            });
                        }

                    }
                })
                    }

            }

    })
