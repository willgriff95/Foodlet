/*global google*/
FoodsIndexCtrl.$inject = ['Food', '$http', '$rootScope'];

function FoodsIndexCtrl(Food, $rootScope){
  this.all = [];

  Food.find()
    .then(() => $rootScope.location = [])
    .then(res => res.data.forEach(food => {
      this.location.push(food.location);
    }))
    //Trying to add map markers for each food location.
    .then(() => this.location.forEach(location => {
      return new google.maps.Marker({
        position: new google.maps.LatLng(location.lat, location.lng)
      });
    }))
    .then(res => this.all = res.data);
}

export default FoodsIndexCtrl;
