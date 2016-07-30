angular.module('directive.map1', [])
    .directive('maps1', function () {
        return {
            scope: {
                'ngModel': "="
            },
            restrict: 'EA',
            link: function (scope, element, attrs) {
                var pos={};
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
                         location(pos);
                    })
                }
               var location=function(pos) {
                   var marker = new google.maps.Marker({
                       position: pos,
                       map: map
                   });
                   map.setCenter(pos);

                   google.maps.event.addListener(marker, 'click', function () {
                       var infowindow = new google.maps.InfoWindow({map: map});
                       infowindow.setContent("you are here");
                       infowindow.open(map, this);
                   });
               }

            }
        }
    })