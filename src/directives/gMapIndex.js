/*global google*/
function gMapIndex(){
  return {
    restrict: 'A',
    scope: {
      foods: '=',
      center: '=?'
    },

    link($scope, $element){
      console.log($element);
      const map = new google.maps.Map($element[0], {
        center: { lat: 51.515, lng: -0.078 },
        zoom: 14
      });
      const marker = new google.maps.Marker({
        map: map,
        position: map.getCenter(),
        icon: 'https://i.imgur.com/aVQgzGW.png?1'
      });
      const infoWindow = new google.maps.InfoWindow();
      let foodMarkers = [];

      $scope.$watch('center', () => {
        if(!$scope.center) return false;
        map.setCenter($scope.center);
        marker.setPosition($scope.center);
      });

      $scope.$watch('foods', () => {
        foodMarkers.forEach(marker => marker.setMap(null));
        foodMarkers = $scope.foods.map(food => {
          const marker = new google.maps.Marker({
            position: food.location,
            map,
            icon: 'https://i.imgur.com/aVQgzGW.png?1'
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

      // shows all food markers
      // Food
      //   .find()
      //   .then(res => {
      //     res.data.forEach(food => {
      //       const title = food.title;
      //       const description = food.description;
      //       infowindows.push(new google.maps.InfoWindow({
      //         content: `<div id="siteNotice" ><p>${title}</p><p>${description}</p></div>`
      //       }));
      //       foodMarkers.push(new google.maps.Marker({
      //         position: new google.maps.LatLng(food.location.lat, food.location.lng),
      //         map: map,
      //         animation: google.maps.Animation.DROP,
      //         title: food.title,
      //         icon: 'https://i.imgur.com/aVQgzGW.png?1'
      //       }));
      //     });
      //   })
      //   .then(() => {
      //     console.log(infowindows);
      //     // console.log(foodMarkers);
      //     foodMarkers.forEach(foodMarker => {
      //       infowindows.forEach(infowindow => {
      //         foodMarker.addListener('click', function() {
      //           infowindow.open(map, foodMarker);
      //         });
      //       });
      //     });
      //   });
    }
  };
}
export default gMapIndex;
