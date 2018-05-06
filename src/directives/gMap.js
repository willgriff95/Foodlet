/*global google*/
function gMap(){
  return {
    restrict: 'A',
    scope: {
      center: '='
    },
    link($scope, $element){

      const map = new google.maps.Map($element[0], {
        center: { lat: 51.515, lng: -0.078 },
        zoom: 14
      });

      const marker = new google.maps.Marker({
        map: map,
        position: map.getCenter()
      });

      $scope.$watch('center', () => {
        map.setCenter($scope.center);
        marker.setPosition($scope.center);
      });
      $scope.control = {
        refresh: true
      };
    }
  };
}
export default gMap;
