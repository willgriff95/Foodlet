FoodsShowCtrl.$inject = ['Food', '$state'];


function FoodsShowCtrl(Food, $state){
  this.food = {};

  Food
    .findById($state.params.id)
    .then(res => this.food = res.data);

  function handleDelete(){
    Food
      .removeById($state.params.id)
      .then(() => $state.go('foodsIndex'));
  }

  this.handleDelete = handleDelete;

}

export default FoodsShowCtrl;
