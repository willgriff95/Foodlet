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


  this.handleDelete = handleDelete;
  this.handleRequestCreate = handleRequestCreate;
  this.handleRequestAccept = handleRequestAccept;

}

export default FoodsShowCtrl;
