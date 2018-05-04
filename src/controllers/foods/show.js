FoodsShowCtrl.$inject = ['Food', '$state'];


function FoodsShowCtrl(Food, $state){
  this.food = {};

  function handleDelete(){
    Food
      .removeById($state.params.id)
      .then(() => $state.go('foodsIndex'));
  }

  this.handleDelete = handleDelete;

}

export default FoodsShowCtrl;
