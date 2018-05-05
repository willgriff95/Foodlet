FoodsEditCtrl.$inject = ['Food', '$state'];

function FoodsEditCtrl(Food, $state){
  this.food = {};

  Food.findById($state.params.id)
    .then(res => this.food = res.data);

  function handleUpdate(){
    Food.updateById($state.params.id, this.food)
      .then(() => $state.go('foodsShow', $state.params));
  }
  this.handleUpdate = handleUpdate;
}

export default FoodsEditCtrl;
