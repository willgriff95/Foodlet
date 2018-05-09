FoodsShowCtrl.$inject = ['Food', '$state', '$auth'];


function FoodsShowCtrl(Food, $state, $auth){
  this.food = {};
  this.distance = null;
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

  function handleRequestAccept(){
    this.request = {status: 'accepted'};
    Food
      .findById($state.params.requestId)
      .then(res => {
        this.request = res.data;
      })
      .then(res => {
        Food
          .requestAccept($state.params.id, $state.params.requestId, res.data);
      });
  }

  function closeModal() {
    this.modalOpen = false;
  }

  function foodHasBeenRequested() {
    if(!this.food.requests) return false;
    return !!this.food.requests.find(request => request.user = $auth.getPayload().sub);
  }


  this.handleDelete = handleDelete;
  this.handleRequestCreate = handleRequestCreate;
  this.handleRequestAccept = handleRequestAccept;
  this.closeModal = closeModal;
  this.foodHasBeenRequested = foodHasBeenRequested;

}

export default FoodsShowCtrl;
