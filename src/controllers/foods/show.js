FoodsShowCtrl.$inject = ['Food', '$state'];


function FoodsShowCtrl(Food, $state){
  this.food = {};
  this.distance = null;

  Food
    .findById($state.params.id)
    .then(res => this.food = res.data);

  function handleDelete(){
    Food
      .removeById($state.params.id)
      .then(() => $state.go('foodsIndex'));
  }


  function handleRequestCreate(){
    Food.requestCreate($state.params.id)
      .then(res => this.food = res.data);
  }


  this.handleDelete = handleDelete;
  this.handleRequestCreate = handleRequestCreate;

}

export default FoodsShowCtrl;
