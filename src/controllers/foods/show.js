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

  // function handleRequestAccept(id, requestId){
  //   this.request = {status: 'accepted'};
  //   Food
  //     .findById(id)
  //     .then(res => {
  //       this.request = res.data;
  //     })
  //     .then(res => {
  //       Food
  //         .requestAccept(id, requestId, res.data);
  //     });
  // }

  function closeModal() {
    this.modalOpen = false;
  }

  function foodHasBeenRequested() {
    if(!this.food.requests) return false;
    return !!this.food.requests.find(request => request.user = $auth.getPayload().sub);
  }


  this.handleDelete = handleDelete;
  this.handleRequestCreate = handleRequestCreate;
<<<<<<< HEAD
  // this.handleRequestAccept = handleRequestAccept;
=======
  this.handleRequestAccept = handleRequestAccept;
  this.closeModal = closeModal;
  this.foodHasBeenRequested = foodHasBeenRequested;
>>>>>>> 82f88ea206c6e86209c1dc392ce8af9e36613921

}

export default FoodsShowCtrl;
