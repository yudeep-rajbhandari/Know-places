/**
 * Created by linux on 7/4/16.
 */
angular.module('directive.map', [])
    .directive('maps', function () {
        return {

            scope: {
                'ngModel': "="
            },
            restrict: 'EA',
            link: function (scope, element, attrs) {
                var pos={};
                var bounds = new google.maps.LatLngBounds ();
                scope.$watch('ngModel',function(newValue,oldValue) {
                    if (newValue.length > 0) {

                        console.log(newValue)
                        var map = new google.maps.Map(element[0], {
                            center: {lat: -34.397, lng: 150.644},
                            zoom: 12
                        })




                        angular.forEach(newValue, function (value) {
                            console.log(value.latitude);
                            console.log(value.longitude);

                            var pos = {
                                lat: value.latitude,
                                lng: value.longitude

                            }



                            var marker = new google.maps.Marker({
                                position: pos,
                                map: map
                            });
                            map.setCenter(pos);

                            google.maps.event.addListener(marker, 'click', function() {
                                var infowindow = new google.maps.InfoWindow({map: map});
                                infowindow.setContent(value.placeName);
                                infowindow.open(map, this);
                            });
                        })
                    }
                })

            }
        }
    })