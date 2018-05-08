/*global google*/
function gMap(){
  return {
    restrict: 'A',
    scope: {
      foods: '=?',
      center: '=?',
      food: '=?'
    },

    link($scope, $element){
      // console.log($element);
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
        position: map.getCenter(),
        icon: 'https://i.imgur.com/aVQgzGW.png?1'
      });
      const infoWindow = new google.maps.InfoWindow();
      let foodMarkers = [];
      let foodMarker = {};
      let currentLocation = {};

      const directionsDisplay = new google.maps.DirectionsRenderer();
      const directionsService = new google.maps.DirectionsService();
      const directions = document.getElementById('directions');
      let destination;

      $scope.$watch('center', () => {
        if(!$scope.center) return false;
        map.setCenter($scope.center);
        marker.setPosition($scope.center);
      });

      $scope.$watch('foods', () => {
        if(!$scope.foods) return false;
        foodMarkers.forEach(marker => marker.setMap(null));
        foodMarkers = $scope.foods.map(food => {
          const marker = new google.maps.Marker({
            position: food.location,
            map,
            icon: 'https://i.imgur.com/aVQgzGW.png?1',
            animation: google.maps.Animation.DROP
          });
          marker.addListener('click', () => {
            infoWindow.setContent(`
              <div id="siteNotice" >
                <p>${food.title}</p>
                <p>${food.description}</p>
              </div>
            `);
            infoWindow.open(map, marker);
          });
          return marker;
        });
      });

      $scope.$watch('food', () => {
        if(!$scope.food) return false;
        foodMarker.forEach(marker => marker.setMap(null));
        foodMarker = new google.maps.Marker({
          position: $scope.food.location,
          map,
          icon: 'https://i.imgur.com/aVQgzGW.png?1',
          animation: google.maps.Animation.DROP
        });
        destination = foodMarker.position;
      });

      //GeoLocation
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          const userCurrentLat = position.coords.latitude;
          const userCurrentLng = position.coords.longitude;

          currentLocation = { lat: userCurrentLat, lng: userCurrentLng };

          infoWindow.setPosition(pos);
          infoWindow.setContent('Your Current Location.');
          infoWindow.open(map);
          map.setCenter(pos);
          displayRoute();
          $scope.$apply();
        }, function() {
          handleLocationError(true, infoWindow, map.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }

      //GeoLocation Error Handler
      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
          'Error: The Geolocation service failed.' :
          'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }

      //Directions
      function displayRoute(){

        directionsService.route({
          origin: currentLocation,
          destination: destination,
          travelMode: 'WALKING'
        }, (response) => {
          directionsDisplay.setDirections(response);
        });
      }
      directionsDisplay.setPanel(directions);
    }
  };
}
export default gMap;
