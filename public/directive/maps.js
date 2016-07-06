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
                var map = new google.maps.Map(element[0], {
                    center: {lat: -34.397, lng: 150.644},
                    zoom: 8
                });

                var pos = {
                    lat: 27.283926,
                    lng: 84.023438
                }

                var marker = new google.maps.Marker({
                    position: pos,
                    map: map
                });
                map.setCenter(pos);

                google.maps.event.addListener(marker, 'click', function() {
                    var infowindow = new google.maps.InfoWindow({map: map});
                    infowindow.setContent("bbbbbbb");
                    infowindow.open(map, this);
                });

            }
        }
    })