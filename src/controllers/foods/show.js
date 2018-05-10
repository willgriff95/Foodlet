FoodsShowCtrl.$inject = ['Food', '$state', '$auth'];


function FoodsShowCtrl(Food, $state, $auth){
  this.food = {};
  this.distance = null;
  this.duration = null;
  this.geoLocation = null;
  this.modalOpen = false;

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
      .then(res => this.food = res.data)
      .then(() => this.modalOpen = true);
  }


  function foodHasBeenRequested() {
    if(!this.food.requests) return false;
    return !!this.food.requests.find(request => request.user = $auth.getPayload().sub);
  }

  function closeModal() {
    this.modalOpen = false;
  }

  this.handleDelete = handleDelete;
  this.handleRequestCreate = handleRequestCreate;
  this.closeModal = closeModal;
  this.foodHasBeenRequested = foodHasBeenRequested;


}

export default FoodsShowCtrl;
