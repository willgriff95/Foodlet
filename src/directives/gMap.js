/*global google*/
gMap.$inject = ['Food'];
function gMap(Food){
  return {
    restrict: 'A',
    scope: {
      center: '='
    },
    link($scope, $element){

      const map = new google.maps.Map($element[0], {
        center: { lat: 51.515, lng: -0.078 },
        zoom: 14,
        scrollwheel: true,
        disableDefaultUI: true,
        styles: [{
          'featureType': 'water',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#dcf2ff'
            },
            {
              'lightness': 17
            }
          ]
        },
        {
          'featureType': 'landscape',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#f5f5f5'
            },
            {
              'lightness': 20
            }
          ]
        },
        {
          'featureType': 'road.highway',
          'elementType': 'geometry.fill',
          'stylers': [
            {
              'color': '#ffffff'
            },
            {
              'lightness': 17
            }
          ]
        },
        {
          'featureType': 'road.highway',
          'elementType': 'geometry.stroke',
          'stylers': [
            {
              'color': '#ffffff'
            },
            {
              'lightness': 29
            },
            {
              'weight': 0.2
            }
          ]
        },
        {
          'featureType': 'road.arterial',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#ffffff'
            },
            {
              'lightness': 18
            }
          ]
        },
        {
          'featureType': 'road.local',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#ffffff'
            },
            {
              'lightness': 16
            }
          ]
        },
        {
          'featureType': 'poi',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#f5f5f5'
            },
            {
              'lightness': 21
            }
          ]
        },
        {
          'featureType': 'poi.park',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#e1ffc5'//#99CC33'//#9DDD48
            },
            {
              'lightness': 21
            }
          ]
        },
        {
          'elementType': 'labels.text.stroke',
          'stylers': [
            {
              'visibility': 'on'
            },
            {
              'color': '#ffffff'
            },
            {
              'lightness': 16
            }
          ]
        },
        {
          'elementType': 'labels.text.fill',
          'stylers': [
            {
              'saturation': 36
            },
            {
              'color': '#333333'
            },
            {
              'lightness': 40
            }
          ]
        },
        {
          'elementType': 'labels.icon',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        }]
      });
      const marker = new google.maps.Marker({
        map: map,
        animation: google.maps.Animation.DROP,
        position: map.getCenter(),
        icon: 'https://i.imgur.com/aVQgzGW.png?1'
      });

      $scope.$watch('center', () => {
        map.setCenter($scope.center);
        marker.setPosition($scope.center);
      });

      Food
        .find()
        .then(res => {
          res.data.forEach(food => {
            return new google.maps.Marker({
              position: new google.maps.LatLng(food.location.lat, food.location.lng),
              map: map,
              animation: google.maps.Animation.DROP,
              title: food.title,
              icon: 'https://i.imgur.com/aVQgzGW.png?1'
            });
          });
        });
    }
  };
}
export default gMap;
