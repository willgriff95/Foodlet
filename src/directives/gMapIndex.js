/*global google*/
gMapIndex.$inject = ['Food'];

function gMapIndex(Food){
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
        position: map.getCenter(),
        icon: 'https://i.imgur.com/aVQgzGW.png?1'
      });
      const infowindows = [];
      const foodMarkers = [];

      $scope.$watch('center', () => {
        map.setCenter($scope.center);
        marker.setPosition($scope.center);
      });

      // shows all food markers
      Food
        .find()
        .then(res => {
          res.data.forEach(food => {
            const title = food.title;
            const description = food.description;
            infowindows.push(new google.maps.InfoWindow({
              content: `<div id="siteNotice" ><p>${title}</p><p>${description}</p></div>`
            }));
            foodMarkers.push(new google.maps.Marker({
              position: new google.maps.LatLng(food.location.lat, food.location.lng),
              map: map,
              animation: google.maps.Animation.DROP,
              title: food.title,
              icon: 'https://i.imgur.com/aVQgzGW.png?1'
            }));
          });
        })
        .then(() => {
          console.log(infowindows);
          console.log(foodMarkers);
          foodMarkers.forEach(foodMarker => {
            infowindows.forEach(infowindow => {
              foodMarker.addListener('click', function() {
                infowindow.open(map, marker);
              });
            });
          });
        });
    }
  };
}
export default gMapIndex;
