FoodsIndexCtrl.$inject = ['Food', '$rootScope'];

function FoodsIndexCtrl(Food, $rootScope){
  this.location = [];

  Food
    .find()
    .then(res => $rootScope.allFoods = res.data);
}

export default FoodsIndexCtrl;
