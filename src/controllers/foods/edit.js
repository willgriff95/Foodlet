FoodsEditCtrl.$inject = ['Food', '$state'];

function FoodsEditCtrl(Food, $state){
  this.food = {};

  function updateLocation(location){
    this.food.location = location;
  }


  Food.findById($state.params.id)
    .then(res => this.food = res.data);

  function handleUpdate(){

    if(this.form.$invalid) return false;

    Food.updateById($state.params.id, this.food)
      .then(() => $state.go('foodsShow', $state.params));
  }
  this.handleUpdate = handleUpdate;
  this.updateLocation = updateLocation;

}

export default FoodsEditCtrl;
